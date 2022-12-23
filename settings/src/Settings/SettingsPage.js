import {useState} from 'react';
import {in_array} from '../utils/lib';
import * as burst_api from '../utils/api';
import Menu from '../Menu/Menu';
import Notices from './Notices';
import Settings from './Settings';
import sleeper from '../utils/sleeper.js';
import {dispatch} from '@wordpress/data';
import {__} from '@wordpress/i18n';
import {useEffect} from 'react';

/*
 * Renders the settings page with Menu and currently selected settings
 *
 */

const SettingsPage = (props) => {
  const {menu, fields, progress, selectedMenuItem, selectedStep} = props;
  const [isAPILoaded, setIsAPILoaded] = useState(false);
  const [changedFields, setChangedFields] = useState([]);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [selectedMainMenuItem, setSelectedMainMenuItem] = useState(
      props.selectedMainMenuItem);

  const addVisibleToMenuItems = (menuItems) => {
    const newMenuItems = menuItems;
    for (const [index, menuItem] of menuItems.entries()) {
      menuItem.visible = true;
      if (menuItem.hasOwnProperty('menu_items')) {
        menuItem.menu_items = addVisibleToMenuItems(menuItem.menu_items);
      }
      newMenuItems[index] = menuItem;
    }

    return newMenuItems;
  };

  /*
  * Set next button to disabled from the fields
  */
  const handleNextButtonDisabled = (disable) => {
    setNextButtonDisabled(nextButtonDisabled !== disable);
    // const {
    //     nextButtonDisabled,
    // } = state;
    // if (nextButtonDisabled !== disable ) {
    //     setState({
    //         nextButtonDisabled:disable,
    //     });
    // }

  };

  //check if all required fields have been enabled. If so, enable save/continue
  // button
  const checkRequiredFields = () => {
    let fieldsOnPage = [];
    //get all fields with group_id props.group_id
    for (const field of props.fields) {
      if (field.menu_id === props.selectedMenuItem) {
        fieldsOnPage.push(field);
      }
    }
    //if the only field on this page has actions, this is a tests page, the
    // nextButtonDisabled should be handled by the LE componenent
    let isTestPage = fieldsOnPage.length == 1 && fieldsOnPage[0].actions &&
        fieldsOnPage[0].actions.length > 0;
    if (!isTestPage) {
      let requiredFields = fieldsOnPage.filter(
          field => field.required && (field.value.length == 0 || !field.value));
      if (requiredFields.length > 0) {
        handleNextButtonDisabled(true);
      }
      else {
        handleNextButtonDisabled(false);
      }
    }

  };

  const filterMenuItems = (menuItems) => {
    const newMenuItems = menuItems;
    for (const [index, menuItem] of menuItems.entries()) {
      const searchResult = props.fields.filter((field) => {
        return (field.menu_id === menuItem.id && field.visible);
      });
      if (searchResult.length === 0) {
        newMenuItems[index].visible = false;
      }
      else {
        newMenuItems[index].visible = true;
        if (menuItem.hasOwnProperty('menu_items')) {
          newMenuItems[index].menu_items = filterMenuItems(menuItem.menu_items);
        }
      }
    }
    return newMenuItems;
  };

  const updateFieldsListWithConditions = () => {
    for (const field of props.fields) {
      let enabled = !(field.hasOwnProperty('react_conditions') &&
          !validateConditions(field.react_conditions, props.fields));

      //we want to update the changed fields if this field has just become
      // visible. Otherwise the new field won't get saved.
      let previouslyDisabled = props.fields[props.fields.indexOf(
          field)].conditionallyDisabled;
      props.fields[props.fields.indexOf(
          field)].conditionallyDisabled = !enabled;
      if (previouslyDisabled && enabled) {
        if (!in_array(field.id, changedFields)) {
          setChangedFields([...changedFields, field.id]);
        }
      }

      props.fields[props.fields.indexOf(field)].visible = enabled;
    }
    filterMenuItems(props.menu.menu_items);
  };

  const saveChangedFields = (changedField) => {
    updateFieldsListWithConditions();
    if (!in_array(changedField, changedFields)) {
      setChangedFields([...changedFields, changedField]);
    }
  };

  const showSavedSettingsNotice = () => {
    const notice = dispatch('core/notices').createNotice(
        'success',
        __('Settings saved', 'burst-statistics'),
        {
          __unstableHTML: true,
          id: 'burst_settings_saved',
          type: 'snackbar',
          isDismissible: true,
        },
    ).then(sleeper(2000)).then((response) => {
      dispatch('core/notices').removeNotice('burst_settings_saved');
    });
  };

  const save = () => {
    let saveFields = [];
    for (const field of fields) {
      if (in_array(field.id, changedFields)) {
        saveFields.push(field);
      }
    }
    burst_api.setFields(saveFields).then((response) => {
      setChangedFields([]);
      showSavedSettingsNotice();
    });
  };

  const wizardNextPrevious = (isPrevious) => {
    const {nextMenuItem, prevMenuItem} = props.getPreviousAndNextMenuItems();
    props.selectMenu(isPrevious ? prevMenuItem : nextMenuItem);
  };

  const saveAndContinue = () => {
    wizardNextPrevious(false);
    save();
  };

  const validateConditions = (conditions, fields) => {
    let relation = conditions.relation === 'OR' ? 'OR' : 'AND';
    let conditionApplies = relation === 'AND' ? true : false;
    for (const key in conditions) {
      if (conditions.hasOwnProperty(key)) {
        let thisConditionApplies = relation === 'AND' ? true : false;
        ;
        let subConditionsArray = conditions[key];
        if (subConditionsArray.hasOwnProperty('relation')) {
          thisConditionApplies = validateConditions(subConditionsArray, fields);
        }
        else {
          for (let conditionField in subConditionsArray) {
            let invert = conditionField.indexOf('!') === 0;
            if (subConditionsArray.hasOwnProperty(conditionField)) {
              let conditionValue = subConditionsArray[conditionField];
              conditionField = conditionField.replace('!', '');
              let conditionFields = fields.filter(
                  field => field.id === conditionField);
              if (conditionFields.hasOwnProperty(0)) {
                if (conditionFields[0].type === 'checkbox') {
                  let actualValue = +conditionFields[0].value;
                  conditionValue = +conditionValue;
                  thisConditionApplies = actualValue === conditionValue;
                }
                else {
                  if (conditionValue.indexOf('EMPTY') !== -1) {
                    thisConditionApplies = conditionFields[0].value.length ===
                        0;
                  }
                  else {
                    thisConditionApplies = conditionFields[0].value.toLowerCase() ===
                        conditionValue.toLowerCase();
                  }
                }
              }
            }
            else {
              console.log('property not found ' + conditionField);
            }

            if (invert) {
              thisConditionApplies = !thisConditionApplies;
            }

          }

        }
        if (relation === 'AND') {
          conditionApplies = conditionApplies && thisConditionApplies;
        }
        else {
          conditionApplies = conditionApplies || thisConditionApplies;
        }
      }
    }
    return conditionApplies ? 1 : 0;
  };

  props.menu.menu_items = addVisibleToMenuItems(props.menu.menu_items);
  useEffect(() => {
    checkRequiredFields();
    updateFieldsListWithConditions();
  }, [fields, changedFields]);
  let fieldsUpdateComplete = changedFields.length === 0;
  return (
      <>
        {/*<Menu*/}
        {/*    isAPILoaded={isAPILoaded}*/}
        {/*    menu={props.menu}*/}
        {/*    selectMenu={props.selectMenu}*/}
        {/*    selectStep={props.selectStep}*/}
        {/*    selectedStep={props.selectedStep}*/}
        {/*    selectedMenuItem={props.selectedMenuItem}*/}
        {/*    selectedMainMenuItem={props.selectedMainMenuItem}*/}
        {/*    getPreviousAndNextMenuItems={props.getPreviousAndNextMenuItems}*/}
        {/*/>*/}
        {/*<Settings*/}
        {/*    updateFields={props.updateFields}*/}
        {/*    selectMenu={props.selectMenu}*/}
        {/*    selectMainMenu={props.selectMainMenu}*/}
        {/*    nextButtonDisabled={nextButtonDisabled}*/}
        {/*    handleNextButtonDisabled={handleNextButtonDisabled}*/}
        {/*    getDefaultMenuItem={props.getDefaultMenuItem}*/}
        {/*    showSavedSettingsNotice={showSavedSettingsNotice}*/}
        {/*    updateField={props.updateField}*/}
        {/*    getFieldValue={props.getFieldValue}*/}
        {/*    addHelp={props.addHelp}*/}
        {/*    pageProps={props.pageProps}*/}
        {/*    setPageProps={props.setPageProps}*/}
        {/*    fieldsUpdateComplete={fieldsUpdateComplete}*/}
        {/*    highLightField={props.highLightField}*/}
        {/*    highLightedField={props.highLightedField}*/}
        {/*    isAPILoaded={isAPILoaded}*/}
        {/*    fields={props.fields}*/}
        {/*    goal_fields={props.goal_fields}*/}
        {/*    progress={props.progress}*/}
        {/*    saveChangedFields={saveChangedFields}*/}
        {/*    menu={props.menu}*/}
        {/*    save={save}*/}
        {/*    saveAndContinue={saveAndContinue}*/}
        {/*    selectedMenuItem={props.selectedMenuItem}*/}
        {/*    selectedMainMenuItem={props.selectedMainMenuItem}*/}
        {/*    selectedStep={props.selectedStep}*/}
        {/*    previousStep={wizardNextPrevious}*/}
        {/*    nextMenuItem={props.nextMenuItem}*/}
        {/*    prevMenuItem={props.prevMenuItem}/>*/}
        {/*<Notices className="burst-wizard-notices"/>*/}
      </>
  );
};
export default SettingsPage;