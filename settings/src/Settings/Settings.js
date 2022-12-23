import {useState, Fragment} from 'react';
import {in_array} from '../utils/lib';
import SettingsGroup from './SettingsGroup';
import Help from './Help';
import {
  Button,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';

/**
 * Renders the selected settings
 *
 */
const Settings = (props) => {
  const [noticesExpanded, setNoticesExpanded] = useState(true);

  const toggleNotices = () => {
    setNoticesExpanded(!noticesExpanded); // @todo simplify?
  };

  const save = () => {
    props.save();
  };

  const saveAndContinue = () => {
    if (!props.nextButtonDisabled) {
      props.saveAndContinue();
    }
  }

  let selectedMenuItem = props.selectedMenuItem;
  let fields = props.fields;
  let selectedStep = props.selectedStep;
  let menu = props.menu;
  const {menu_items: menuItems} = menu;

  let selectedFields = fields.filter(
      field => field.menu_id === selectedMenuItem);
  let groups = [];
  for (const selectedField of selectedFields) {
    if (!in_array(selectedField.group_id, groups)) {
      groups.push(selectedField.group_id);
    }
  }
  let btnSaveText = __('Save', 'burst-statistics');
  for (const menuItem of menuItems) {
    if (menuItem.id === selectedMenuItem && menuItem.tests_only) {
      btnSaveText = __('Refresh', 'burst-statistics');
    }
  }

  //convert progress notices to an array useful for the help blocks
  let notices = [];
  for (const notice of progress.notices) {
    let noticeIsLinkedToField = false;

    //notices that are linked to a field. Only in case of warnings.
    if (notice.show_with_options && notice.output.icon === 'warning') {
      let noticeFields = selectedFields.filter(
          field => notice.show_with_options.includes(field.id));
      noticeIsLinkedToField = noticeFields.length > 0;
    }
    //notices that are linked to a menu id.
    if (noticeIsLinkedToField || notice.menu_id === selectedMenuItem) {
      let help = {};
      help.title = notice.output.title ? notice.output.title : false;
      help.label = notice.output.label;
      help.id = notice.id;
      help.text = notice.output.msg;
      help.url = notice.output.url;
      help.linked_field = notice.show_with_option;
      notices.push(help);
    }
  }

  for (const notice of selectedFields.filter(field => field.help)) {
    let help = notice.help;
    help.id = notice.id;
    notices.push(notice.help);
  }
  notices = notices.filter(notice => notice.label.toLowerCase() !== 'completed');

  let continueLink = props.nextButtonDisabled ? `#${props.selectedMainMenuItem}/${props.selectedMenuItem}` : `#${props.selectedMainMenuItem}/${props.nextMenuItem}`;
  return (
      <Fragment>
        <div className="burst-wizard-settings burst-column-2">
          {groups.map((group, i) =>
              <SettingsGroup
                  updateFields={props.updateFields}
                  selectMenu={props.selectMenu}
                  selectMainMenu={props.selectMainMenu}
                  handleNextButtonDisabled={props.handleNextButtonDisabled}
                  menu={props.menu}
                  showSavedSettingsNotice={props.showSavedSettingsNotice}
                  updateField={props.updateField}
                  getFieldValue={props.getFieldValue}
                  refreshTests={props.refreshTests}
                  resetRefreshTests={props.resetRefreshTests}
                  addHelp={props.addHelp}
                  pageProps={props.pageProps}
                  setPageProps={props.setPageProps}
                  fieldsUpdateComplete={props.fieldsUpdateComplete}
                  key={i}
                  index={i}
                  highLightField={props.highLightField}
                  highLightedField={props.highLightedField}
                  selectedMenuItem={selectedMenuItem}
                  saveChangedFields={props.saveChangedFields}
                  group={group}
                  fields={selectedFields}
                  goal_fields={props.goal_fields}
              />)

          }
          <div className="burst-grid-item-footer">
            {/*This will be shown only if current step is not the first one*/}
            {props.selectedMenuItem !== menuItems[0].id &&
                <a className="button button-secondary" href={`#${props.selectedMainMenuItem}/${props.prevMenuItem}`} onClick={() => props.previousStep(true)}>
                  {__('Previous', 'burst-statistics')}
                </a>
            }
            <button
                className="button button-primary"
                onClick={save}>
              {btnSaveText}
            </button>
            {/*This will be shown only if current step is not the last one*/}
            {props.selectedMenuItem !== menuItems[menuItems.length - 1].id &&
                <>
                  <a disabled={props.nextButtonDisabled} className="button button-primary" href={continueLink} onClick={saveAndContinue}>
                    {__('Save and Continue', 'burst-statistics')}
                  </a>
                </>
            }
          </div>
        </div>
        <div className="burst-wizard-help">
          {notices.length > 0 &&
              <div className="burst-help-header">
                <div className="burst-help-title burst-h4">
                  {__('Notifications', 'burst-statistics')}
                </div>
                <div className="burst-help-control" onClick={() => toggleNotices()}>
                  {!noticesExpanded &&
                      __('Expand all', 'burst-statistics')}
                  {noticesExpanded &&
                      __('Collapse all', 'burst-statistics')}
                </div>
              </div>
          }
          {notices.map(
              (field, i) => <Help key={i} noticesExpanded={noticesExpanded} index={i} help={field} fieldId={field.id}/>)}
        </div>
      </Fragment>
  );
};
export default Settings;