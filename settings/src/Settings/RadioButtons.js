// write a functional component
import Icon from '../utils/Icon';
import {Fragment, useState} from 'react';

const RadioButtons = (props) => {
  const {
      disabled,
      field,
      goal_id,
      label,
      help,
      value,
      onChangeHandler,
      className,
    } = props;

return (
    <div className="burst-radio-buttons">
      <p className={'burst-label'}>{label}</p>
      <div className="burst-radio-buttons__list">
      {Object.keys(field.options).map((key) => {
        return (
            <Fragment key={key} >
              <input
                     checked={field.value === field.options[key].type}
                     type="radio"
                     name={field.id}
                     id={goal_id + '-' + field.id + '-' + field.options[key].type}
                     value={field.options[key].type}
                     onChange={onChangeHandler}
              />
              <label htmlFor={goal_id + '-' + field.id + '-' + field.options[key].type} className="burst-radio-buttons__list__item">
                <Icon name={field.options[key].icon} size={18} />
                <h5>
                  {field.options[key].label}
                </h5>
                <div className={'burst-divider'} />
                <p>
                  {field.options[key].description}
                </p>
              </label>
            </ Fragment>
        );
      }
      )}
      </div>
    </div>
  );
}

export default RadioButtons;