import Icon from '../../utils/Icon';
import {useState} from 'react';

const RadioButtons = ({
  disabled,
  field: {id, options},
  goal_id,
  label,
  help,
  value,
  onChangeHandler,
  className,
}) => {
  console.log('update RadioButtons: ' + id + ' where goal_id ' + goal_id);
  return (
      <div className={`burst-radio-buttons ${className}`}>
        <p className="burst-label">{label}</p>
        <div className="burst-radio-buttons__list">
          <h1>{value}</h1>
          {Object.keys(options).map(key => {
            const {type, icon, label, description} = options[key];
            return (
                <div key={key} className="burst-radio-buttons__list__item">
                  <h5>{type} == {value}</h5>

                  <input
                      type="radio"
                      name={id}
                      id={`${goal_id}-${id}-${type}`}
                      value={type}
                      disabled={disabled}
                      onChange={e => {
                        console.log(e);
                        console.log(e.target.value);
                        onChangeHandler(e.target.value);

                      }}
                  />
                  <label htmlFor={`${goal_id}-${id}-${type}`}>
                    <Icon name={icon} size={18} />
                    <h5>{label}</h5>
                    <div className="burst-divider" />
                    <p>{description}</p>
                  </label>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default RadioButtons;