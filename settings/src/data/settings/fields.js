import create from 'zustand';
import produce from 'immer';
import * as burst_api from "../../utils/api";
import sleeper from "../../utils/sleeper.js";
import {__} from '@wordpress/i18n';
import {dispatch} from '@wordpress/data';

const fetchFields = () => {
  return burst_api.getFields().then((response) => {
    let fields = response.fields;
    let progress = response.progress;
    return {fields, progress};
  }).catch((error) => {
    console.error(error);
  });
}

export const useFields = create(( set, get ) => ({
  fieldsLoaded: false,
  fields: [],
  changedFields:[],
  progress:[],
  nextButtonDisabled:false,
  highLightField: '',
  setHighLightField: (highLightField) => set(state => ({ highLightField })),
  setChangedField: async (id, value) => {
    set(
        produce((state) => {
          //remove current reference
          const existingFieldIndex = state.changedFields.findIndex(field => {
            return field.id===id;
          });

          if (existingFieldIndex!==-1){
            state.changedFields.splice(existingFieldIndex, 1);
          }

          //add again, with new value
          let field = {};
          field.id = id;
          field.value = value;
          state.changedFields.push(field);
        })
    )
  },
  showSavedSettingsNotice : () => {
    handleShowSavedSettingsNotice();
  },
  updateField: (id, value) => {
    set(
        produce((state) => {
          let index = false;
          state.fields.forEach(function(fieldItem, i) {
            if (fieldItem.id === id ){
              index = i;
            }
          });
          state.fields[index].value = value;
        })
    )
  },

  addHelpNotice : (id, label, text, title) => {
    //create help object
    let help = {};
    help.label=label;
    help.text=text;
    if (title) help.title=title;
    let fields = get().fields;

    //add to selected field
    fields.forEach(function(fieldItem, i) {
      if (fieldItem.id === id && !fieldItem.help ){
        fieldItem.help = help
        fields[i] = fieldItem;
        set((state) => ({fields: fields}));
      }
    });

  },
  // getFieldValue : () => {
  //   let fields = get().fields;
  //   for (const fieldItem of fields){
  //     if (fieldItem.id === id ){
  //       return fieldItem.value;
  //     }
  //   }
  //   return false;
  // },
  saveFields: async () => {

    let fields = get().fields;
    let changedFields = get().changedFields;
    let progress = get().progress;
    let saveFields = [];
    for ( const field of fields ){
      let fieldIsIncluded = changedFields.filter( changedField => changedField.id===field.id ).length>0;
      if ( fieldIsIncluded ){
        saveFields.push(field);
      }
    }

    //if no fields were changed, do nothing.
    if (saveFields.length>0) {
      burst_api.setFields(saveFields).then(( response ) => {
        progress = response.progress;
        fields = response.fields;
      });
    }

    handleShowSavedSettingsNotice();
    set((state) => ({changedFields: [], fields:fields, progress:progress}));
  },

  updateFieldsData: async (selectedSubMenuItem) => {
    let fields = get().fields;

    // let progress = get().progress;
    // let changedFields = get().changedFields;
    // let reload = false;
    // for ( const field of fields ){
    // 	let fieldIsIncluded = changedFields.filter( changedField => changedField.id===field.id ).length>0;
    // 	reload = fieldIsIncluded && field.reload_fields_onchange;
    // 	if (reload) {
    // 		break;
    // 	}
    // }
    //
    // //check if we want a server side reload
    // if ( reload ) {
    // 	console.log("reload all fields from server");
    // 	let response = await fetchFields();
    // 	let serverFields = response.fields;
    // 	//copy values over from current to server fields
    // 	for ( const serverField of serverFields ){
    // 		let clientField = fields.filter( clientField => clientField.id===serverField.id )[0];
    // 		serverField.value = clientField.value;
    // 	}
    // 	fields = serverFields;
    // 	progress = response.progress;
    // }

    fields = updateFieldsListWithConditions(fields);
    const nextButtonDisabled = isNextButtonDisabled(fields, selectedSubMenuItem);

    set(
        produce((state) => {
          state.fields = fields;
          state.nextButtonDisabled = nextButtonDisabled;
        })
    )
  },
  fetchFieldsData: async ( selectedSubMenuItem ) => {
    const { fields, progress }   = await fetchFields();
    //process premium field
    if ( burst_settings.is_premium ) {
      for (const field of fields ){
        if (field.premium) {
          if (field.premium.default) field.default = field.premium.default;
          if (field.premium.label) field.label = field.premium.label;
          if (field.premium.comment) field.comment = field.premium.comment;
          if (field.premium.tooltip) field.tooltip = field.premium.tooltip;
          if (field.premium.react_conditions) field.react_conditions = field.premium.react_conditions;
        }
      }
    }
    let conditionallyEnabledFields = updateFieldsListWithConditions(fields);
    let selectedFields = conditionallyEnabledFields.filter(field => field.menu_id === selectedSubMenuItem);
    set((state) => ({fieldsLoaded: true, fields:conditionallyEnabledFields, selectedFields:selectedFields, progress:progress }));
  }
}));

//check if all required fields have been enabled. If so, enable save/continue button
const isNextButtonDisabled = (fields, selectedMenuItem) => {
  let fieldsOnPage = [];
  //get all fields with group_id this.props.group_id
  for (const field of fields){
    if (field.menu_id === selectedMenuItem ){
      fieldsOnPage.push(field);
    }
  }

  let requiredFields = fieldsOnPage.filter(field => field.required && !field.conditionallyDisabled && (field.value.length==0 || !field.value) );
  return requiredFields.length > 0;
}

export const updateFieldsListWithConditions = (fields) => {
  let newFields = [];
  fields.forEach(function(field, i  ) {
    let enabled = !( field.hasOwnProperty('react_conditions') && !validateConditions(field.react_conditions, fields) );
    //we want to update the changed fields if this field has just become visible. Otherwise the new field won't get saved.
    const newField = {...field};
    newField.conditionallyDisabled = !enabled;
    newFields.push(newField);
  });
  return newFields;
}

export const handleShowSavedSettingsNotice = () => {
  const notice = dispatch('core/notices').createNotice(
      'success',
      __( 'Settings Saved', 'burst-statistics' ),
      {
        __unstableHTML: true,
        id: 'burst_settings_saved',
        type: 'snackbar',
        isDismissible: true,
      }
  ).then(sleeper(2000)).then(( response ) => {
    dispatch('core/notices').removeNotice('burst_settings_saved');
  });
}

const validateConditions = (conditions, fields) => {
  let relation = conditions.relation === 'OR' ? 'OR' : 'AND';
  let conditionApplies = relation==='AND';
  for (const key in conditions) {
    if ( conditions.hasOwnProperty(key) ) {
      let thisConditionApplies = relation==='AND';
      let subConditionsArray = conditions[key];
      if ( subConditionsArray.hasOwnProperty('relation') ) {
        thisConditionApplies = validateConditions(subConditionsArray, fields)
      } else {
        for ( let conditionField in subConditionsArray ) {
          let invert = conditionField.indexOf('!')===0;
          if ( subConditionsArray.hasOwnProperty(conditionField) ) {
            let conditionValue = subConditionsArray[conditionField];
            conditionField = conditionField.replace('!','');
            let conditionFields = fields.filter(field => field.id === conditionField);
            if ( conditionFields.hasOwnProperty(0) ){
              let field = conditionFields[0];
              let actualValue = field.value;
              if ( field.type==='checkbox' ) {
                thisConditionApplies = actualValue === conditionValue;
              } else if ( field.type==='multicheckbox' ) {

                //multicheckbox conditions
                //loop through objects
                thisConditionApplies = false;
                let arrayValue = actualValue;
                if ( arrayValue.length===0 ) {
                  thisConditionApplies = false;
                } else {
                  for (const key of Object.keys(arrayValue)) {
                    if ( !Array.isArray(conditionValue) ) conditionValue = [conditionValue];
                    if ( conditionValue.includes(arrayValue[key])){
                      thisConditionApplies = true;
                      break;
                    }
                  }
                }
              } else if ( field.type==='radio' ) {
                //as the regions field can be both radio and multicheckbox, an array is possible for a radio field
                if ( Array.isArray(conditionValue) ) {
                  thisConditionApplies = conditionValue.includes(actualValue);
                } else {
                  thisConditionApplies = conditionValue === actualValue;
                }

              } else {
                if (conditionValue.indexOf('EMPTY')!==-1){
                  thisConditionApplies = actualValue.length===0;
                } else {
                  thisConditionApplies = String(actualValue).toLowerCase() === conditionValue.toLowerCase();
                }
              }
            }
          }
          if ( invert ){
            thisConditionApplies = !thisConditionApplies;
          }
          if ( relation === 'AND' ) {
            conditionApplies = conditionApplies && thisConditionApplies;
          } else {
            conditionApplies = conditionApplies || thisConditionApplies;
          }
        }
      }
    }
  }

  return conditionApplies ? 1 : 0;
}