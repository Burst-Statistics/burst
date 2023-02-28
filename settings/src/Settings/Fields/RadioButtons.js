import Icon from '../../utils/Icon';
import {useState} from 'react';
import Tooltip from '@mui/material/Tooltip';

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

  return (
      <div className={`burst-radio-buttons ${className}`}>
        <p className="burst-label">{label}</p>
        <div className="burst-radio-buttons__list">
          {Object.keys(options).map(key => {
            const {type, icon, label, description} = options[key];
            return (
                <Tooltip title={description} arrow key={key} enterDelay={1000}>
                <div key={`${goal_id}-${id}-${type}`} className="burst-radio-buttons__list__item">
                  <input
                      type="radio"
                      checked={type === value}
                      name={`${goal_id}-${id}`}
                      id={`${goal_id}-${id}-${type}`}
                      value={type}
                      disabled={disabled}
                      onChange={e => {
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
                </Tooltip>
            );
          })}
        </div>
      </div>
  );
};

export default RadioButtons;