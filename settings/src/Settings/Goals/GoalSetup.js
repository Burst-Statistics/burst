import React, {useState, useEffect} from 'react';
import Icon from '../../utils/Icon';
import Tooltip from '@mui/material/Tooltip';
import {__} from '@wordpress/i18n';
import GoalField from './GoalField';
import EditableText from '../Fields/EditableText';
import {ToggleControl} from '@wordpress/components';
import {useGoals} from '../../data/settings/goals';

const GoalSetup = (props) => {
  const {goalFields, setGoalValue} = useGoals();
  const id = props.id;
  const fields = goalFields[id];
  if (id === 0) {
    // @todo add a default goal
    return (
        <h1>Default setup</h1>
    );
  }
  const [status, setStatus] = useState(fields.goal_status.value === 'active');

  function handleStatusToggle(value) {
    setStatus(value);
    setGoalValue(id, 'goal_status', value ? 'active' : 'inactive');
  }

  function handleTitleChange(value) {
    setGoalValue(id, 'goal_title', value);
  }

  let type = fields.goal_type.value;
  let iconName = fields.goal_type.options[type].icon;

  return (
      <div className="burst-settings-goals__list__item" key={id}>
        <details open>
          <summary>
            <Icon name={iconName} size={20}/>

            <span>
              <EditableText value={fields.goal_title.value}
                          onChange={handleTitleChange}/>
            </span>
            <Tooltip arrow
                     title={status ? __('Click to de-activate',
                         'burst-statistics') : __(
                         'Click to activate', 'burst-statistics')}>
              <span>
            <ToggleControl
                checked={status}
                onChange={handleStatusToggle}
            />
                </span>
            </Tooltip>
            <Icon name={'chevron-down'} size={18}/>
          </summary>
          <div className="burst-settings-goals__list__item__fields">
            {Object.keys(fields).map((i, index) => {
              let field = fields[i];
              return (
                  <GoalField
                      key={i}
                      field={field}
                      goal_id={id}
                      value={field.value}
                  />
              );
            })}
          </div>
        </details>
      </div>
  );
};
export default GoalSetup;