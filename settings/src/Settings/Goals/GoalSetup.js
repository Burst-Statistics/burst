import React, { useState, useEffect } from 'react';
import Icon from '../../utils/Icon';
import Tooltip from '@mui/material/Tooltip';
import{__} from '@wordpress/i18n';
import GoalField from './GoalField';
import EditableText from '../Fields/EditableText';
import { ToggleControl } from '@wordpress/components';
import { useGoals } from '../../data/settings/goals';

const GoalSetup = (props) => {
  console.log('update GoalSetup');
  const { goalFields, goalValues, setGoalValue } = useGoals();
  const values = goalValues[props.id];
  const id = props.id;
  const [status, setStatus] = useState(values.status === 'active');
  console.log(goalValues);

  function handleStatusToggle(value) {
    setStatus(value);
    setGoalValue(id, 'status', value ? 'active' : 'inactive');
  }

  function handleTitleChange(value) {
    setGoalValue(id, 'goal_title', value);
  }

  let iconName;
  let iconTooltip;
  if (goalFields.goal_type.options && goalFields.goal_type.options[values.goal_type] && Object.keys(goalFields.goal_type.options).includes(values.goal_type)) {
    iconTooltip = goalFields.goal_type.options[values.goal_type].label;
    iconName = goalFields.goal_type.options[values.goal_type].icon;
  } else {
    iconName = 'times';
  }

  return (
      <div className="burst-settings-goals__list__item" key={id}>
        <details>
          <summary>
            <Tooltip title={iconTooltip} arrow>
              <Icon name={iconName} size={20} />
            </Tooltip>
            <EditableText value={values.goal_title} onChange={handleTitleChange} />
            {/*<Tooltip arrow title={status ? __('Active', 'burst-statistics') : __('Inactive', 'burst-statistics')}>*/}
              <ToggleControl
                  checked={status}
                  onChange={handleStatusToggle}
              />
            {/*</Tooltip>*/}
            <Icon name={'chevron-down'} size={18} />
          </summary>
          <div className="burst-settings-goals__list__item__fields">
            {Object.keys(goalFields).map((i, index) => {
              let field = goalFields[i];
              let value = values && values[field.id] ? values[field.id] : goalFields[i].default;
              return (
                  <GoalField
                      key={i}
                      field={field}
                      goal_id={id}
                      value={value}
                  />
              );
            })}
          </div>
        </details>
      </div>
  );
};
export default GoalSetup;