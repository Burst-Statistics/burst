import {
  TextControl,
  RadioControl,
  SelectControl,
  TextareaControl,
  __experimentalNumberControl as NumberControl,
  ToggleControl,
} from '@wordpress/components';
import {useState}from 'react';
import {__} from '@wordpress/i18n';
import Hyperlink from '../utils/Hyperlink';
import IpBlock from './IpBlock';
import UserRoleBlock from './UserRoleBlock';
import GoalsSettings from './Goals/GoalsSettings';
import RadioButtons from './RadioButtons';

const Field = (props) => {
    const [value, setValue] = useState(props.value);
  let highLightClass = props.highLightedField === props.field.id
      ? 'burst-field-wrap burst-highlight'
      : 'burst-field-wrap';

  const onChangeHandler = (fieldValue) => {
    let fields = props.fields;
    let field = props.field;
    fields[props.index]['value'] = fieldValue;
    props.saveChangedFields(field.id);
  };

  let field = props.field;
  let fieldValue = value;
  let disabled = field.disabled;
  let options = [];
  if (field.options) {
    for (var key in field.options) {
      if (field.options.hasOwnProperty(key)) {
        let item = {};
        item.label = field.options[key];
        item.value = key;
        options.push(item);
      }
    }
  }

  //if a feature can only be used on networkwide or single site setups, pass
  // that info here.
  if (!burst_settings.networkwide_active && field.networkwide_required) {
    disabled = true;
    field.comment = <>{__('This feature is only available networkwide.',
        'burst-statistics')}<Hyperlink target="_blank"
                                       text={__('Network settings',
                                           'burst-statistics')}
                                       url={burst_settings.network_link}/></>;
  }

  if (field.conditionallyDisabled) {
    disabled = true;
  }

  if (!field.visible) {
    return (
        <></>
    );
  }

  if (field.type === 'checkbox') {
    return (
        <div className={highLightClass}>
          <ToggleControl
              disabled={disabled}
              checked={field.value == 1}
              label={field.label}
              onChange={(fieldValue) => onChangeHandler(fieldValue)}
          />
          {field.comment &&
              <div dangerouslySetInnerHTML={{__html: field.comment}}></div>}
        </div>
    );
  }

  if (field.type === 'hidden') {
    return (
        <input type="hidden" value={field.value}/>
    );
  }

  if (field.type === 'radio') {
    return (
        <div className={highLightClass}>
          <RadioControl
              label={field.label}
              onChange={(fieldValue) => onChangeHandler(fieldValue)}
              selected={fieldValue}
              options={options}
          />
        </div>
    );
  }

  if (field.type === 'text' || field.type === 'email') {
    return (
        <div className={highLightClass}>
          <TextControl
              help={field.comment}
              label={field.label}
              onChange={(fieldValue) => onChangeHandler(fieldValue)}
              value={fieldValue}
          />
        </div>
    );
  }

  if (field.type === 'button') {
    return (
        <div className={'burst-field-button ' + highLightClass}>
          <label>{field.label}</label>
          <Hyperlink className="button button-default" text={field.button_text}
                     url={field.url}/>
        </div>
    );
  }

  if (field.type === 'textarea') {
    return (
        <div className={highLightClass}>
          <TextareaControl
              label={field.label}
              help={field.comment}
              value={fieldValue}
              onChange={(fieldValue) => onChangeHandler(fieldValue)}
          />
        </div>
    );
  }
  if (field.type === 'number') {
    return (
        <div className={highLightClass}>
          <NumberControl
              onChange={(fieldValue) => onChangeHandler(fieldValue)}
              help={field.comment}
              label={field.label}
              value={fieldValue}
          />
        </div>
    );
  }
  if (field.type === 'email') {
    return (
        <div className={highLightClass}>
          <TextControl
              help={field.comment}
              label={field.label}
              onChange={(fieldValue) => onChangeHandler(fieldValue)}
              value={fieldValue}
          />
        </div>
    );
  }

  if (field.type === 'select') {
    return (
        <div className={highLightClass}>
          <SelectControl
              disabled={disabled}
              help={field.comment}
              label={field.label}
              onChange={(fieldValue) => onChangeHandler(fieldValue)}
              value={fieldValue}
              options={options}
          />
        </div>
    );
  }

  if (field.type === 'ip_blocklist') {

    return (
        <div className={highLightClass}>
          <IpBlock
              disabled={disabled}
              field={props.field}
              label={field.label}
              help={field.comment}
              value={fieldValue}
              onChangeHandler={onChangeHandler}
              id="ip_address"
          />
        </div>

    );
  }

  if (field.type === 'user_role_blocklist') {

    return (
        <div className={highLightClass}>
          <UserRoleBlock
              disabled={disabled}
              field={props.field}
              label={field.label}
              help={field.comment}
              value={fieldValue}
              onChangeHandler={onChangeHandler}
              id="user_role_block"
          />
        </div>

    );
  }

  if (field.type === 'goals') {

    return (
        <div className={highLightClass}>
          <GoalsSettings
              disabled={disabled}
              field={props.field}
              goal_fields={props.goal_fields}
              label={field.label}
              help={field.comment}
              value={fieldValue}
              onChangeHandler={onChangeHandler}
              id="user_role_block"
          />
        </div>

    );
  }

  if (field.type === 'radio-buttons') {
    return (
        <div className={highLightClass}>
          <RadioButtons
              disabled={disabled}
              field={props.field}
              goal_id={props.goal_id}
              label={field.label}
              help={field.comment}
              value={fieldValue}
              onChangeHandler={onChangeHandler}
              className="radio-buttons"
          />
        </div>
    );
  }

  return (
      'not found field type ' + field.type
  );
};

export default Field;