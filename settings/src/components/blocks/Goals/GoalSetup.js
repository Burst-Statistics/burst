import React, {useState, useEffect} from 'react';
import Icon from '../../../utils/Icon';
import Tooltip from '@mui/material/Tooltip';
import {__} from '@wordpress/i18n';
import GoalField from './GoalField';
import EditableText from '../Fields/EditableText';
import {ToggleControl} from '@wordpress/components';
import {useGoalsStore} from '../../../store/useGoalsStore';
import DeleteGoalModal from './DeleteGoalModal';
import {setOption} from '../../../utils/api';


const GoalSetup = (props) => {
  const { id, goal, goalFields, setGoalValue,onRemove, onUpdate } = props;
  if (!goalFields) {
    return null;
  }
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [status, setStatus] = useState(goalFields.goal_status.value === 'active');

  function handleStatusToggle(value) {
    if ( burst_settings.goals_information_shown == '0') {
      burst_settings.goals_information_shown = '1';
      setOption('goals_information_shown', true);

    }
    setStatus(value);
    setGoalValue(id, 'goal_status', value ? 'active' : 'inactive');
  }

  function handleTitleChange(value) {
    setGoalValue(id, 'goal_title', value);
  }

  let type = goalFields.goal_type.value;
  let iconName = type && goalFields.goal_type.options[type] ? goalFields.goal_type.options[type].icon : 'eye';
  let title = goalFields.goal_title.value ? goalFields.goal_title.value : '';
  let dateCreated = goal && goal.date_created !== undefined && goal.date_created > 1 ? goal.date_created : 1;

  return (
      <div className="burst-settings-goals__list__item">
        <details >
          <summary>
            <Icon name={iconName} size={20}/>

            <span>
              <EditableText value={title}
                            defaultValue={__('New goal', 'burst-statistics')}
                            onChange={handleTitleChange}/>
            </span>
            <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="burst-button-icon burst-button-icon--delete"
            >
              <Icon name={'trash'} size={18} />
            </button>
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
            {Object.keys(goalFields).map((i, index) => {
              let field = goalFields[i];
              return (
                  <GoalField
                      key={index}
                      field={field}
                      goal_id={id}
                      value={field.value}
                      setGoalValue={setGoalValue}
                  />
              );
            })}
          </div>
        </details>
        <DeleteGoalModal
            isOpen={isDeleteModalOpen}
            goal={{ name: title, status: status ? __('Active', 'burst-statistics') : __('Inactive', 'burst-statistics') , dateCreated: dateCreated }} // Replace with actual goal data
            onDelete={() => {
              onRemove(id);
              setIsDeleteModalOpen(false);
            }}
            onClose={() => setIsDeleteModalOpen(false)}
        />
      </div>
  );
};
export default GoalSetup;