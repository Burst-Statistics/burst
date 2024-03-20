import {in_array} from "../../utils/lib";
import SettingsGroup from "./SettingsGroup";
import Help from "./Help";
import {useState} from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {useFields} from "../../store/useFieldsStore";
import {useMenu} from "../../store/useMenuStore";
import {toast} from 'react-toastify';
import ErrorBoundary from "../ErrorBoundary";
import {useGoalsStore} from '../../store/useGoalsStore';

/**
 * Renders the selected settings
 *
 */
const Settings = (props) => {
  const [noticesExpanded, setNoticesExpanded] = useState(true);
  const progress = useFields((state) => state.progress);
  const fieldsLoaded = useFields((state) => state.fieldsLoaded);
  const saveFields = useFields((state) => state.saveFields);
  const fields = useFields((state) => state.fields);
  const subMenuLoaded = useMenu((state) => state.subMenuLoaded);
  const subMenu = useMenu((state) => state.subMenu);
  const selectedSubMenuItem = useMenu((state) => state.selectedSubMenuItem);
  const saveGoals = useGoalsStore((state) => state.saveGoals);

  const toggleNotices = () => {
    setNoticesExpanded(!noticesExpanded);
  }

  const saveData = async () => {
    // add 500ms timeout so animations work and the user can see the toast
    const response = Promise.all([saveFields(), saveGoals(), new Promise(resolve => setTimeout(resolve, 600))]);
    toast.promise(
        response,
        {
          pending: __('Saving settings...', 'burst-statistics'),
          success: __('Settings saved', 'burst-statistics'),
          error: __('Something went wrong', 'burst-statistics'),
        }
    )
  }

  const { menu_items: menuItems } = subMenu;
  if ( !subMenuLoaded ||  !fieldsLoaded || menuItems.length ===0  ) {
    return (
          <div className="burst-grid-item burst-grid-item-placeholder burst-column-2"></div>
    );
  }
  let selectedFields = fields.filter(field => field.menu_id === selectedSubMenuItem);
  let groups = [];
  for (const selectedField of selectedFields){
    if ( !in_array(selectedField.group_id, groups) ){
      groups.push(selectedField.group_id);
    }
  }
  let btnSaveText = __('Save', 'burst-statistics');

  //convert progress notices to an array useful for the help blocks
  let notices = [];
  for (const notice of progress.notices){
    let noticeIsLinkedToField = false;

    //notices that are linked to a field. Only in case of warnings.
    if ( notice.show_with_options && notice.output.icon === 'warning') {
      let noticeFields = selectedFields.filter(field => notice.show_with_options.includes(field.id));
      noticeIsLinkedToField = noticeFields.length>0;
    }
    //notices that are linked to a menu id.
    if ( noticeIsLinkedToField || notice.menu_id === selectedSubMenuItem ) {
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

  //help items belonging to a field
  //if field is hidden, hide the notice as well
  for (const notice of selectedFields.filter(field => field.help && !field.conditionallyDisabled)){
    let help = notice.help;
    //check if the notices array already includes this help item
    //this can happen in case of dynamic fields, like details per purpose
    let existingNotices = notices.filter(noticeItem => noticeItem.id && noticeItem.id===help.id);
    if ( existingNotices.length===0) {
      // if (!help.id ) help['id'] = notice.id;

      notices.push(notice.help);
    }
  }
  notices = notices.filter(notice => notice.label.toLowerCase()!=='completed');
  const isLicenseBlock = selectedFields[0].id === 'license';
  return (
      <ErrorBoundary fallback={'Could not load Settings'}>
        <div className="burst-wizard-settings burst-column-2">
          { groups.map((group, i) =>
              <SettingsGroup key={i} index={i} group={group} fields={selectedFields}/>)
          }
          <div className="burst-grid-item-footer">
            { ! isLicenseBlock && (<button
                className="burst-button burst-button--primary"
                onClick={ ( e ) => saveData(e) }>
              { btnSaveText }
            </button>)}
          </div>
        </div>
        <div className="burst-wizard-help">
          <div className="burst-help-header">
            <div className="burst-help-title burst-h4">
              {__("Notifications", "burst-statistics")}
            </div>
            <div className="burst-help-control" onClick={ () => toggleNotices() }>
              {!noticesExpanded && __("Expand all","burst-statistics")}
              {noticesExpanded && __("Collapse all","burst-statistics")}
            </div>
          </div>
          {notices.map((field, i) => <Help key={i} noticesExpanded={noticesExpanded} index={i} help={field} fieldId={field.id} item={field.help}/>)}
        </div>
      </ErrorBoundary>
  )

}
export default Settings
