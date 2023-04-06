import React, {useState, useEffect} from 'react';
import Icon from '../../../utils/Icon';
import Tooltip from '@mui/material/Tooltip';
import {__} from '@wordpress/i18n';
import GoalField from './GoalField';
import EditableText from '../Fields/EditableText';
import {ToggleControl} from '@wordpress/components';
import {useGoals} from '../../../store/useGoalsStore';
import DeleteGoalModal from './DeleteGoalModal';


const GoalSetup = (props) => {
  const goalFields = useGoals((state) => state.goalFields);
  const setGoalValue = useGoals((state) => state.setGoalValue);
  const removeGoal = useGoals((state) => state.removeGoal);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const id = props.id;
  const fields = goalFields[id];
  if (id === 0 || !fields) {
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
  let iconName = type && fields.goal_type.options[type] ? fields.goal_type.options[type].icon : 'eye';
  let title = fields.goal_title.value ? fields.goal_title.value : __('New goal', 'burst-statistics');
  let dateCreated = 'datumm';

  return (
      <div className="burst-settings-goals__list__item" key={id}>
        <details >
          <summary>
            <Icon name={iconName} size={20}/>

            <span>
              <EditableText value={title}
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
        <DeleteGoalModal
            isOpen={isDeleteModalOpen}
            goal={{ name: title, status: status ? __('Active', 'burst-statistics') : __('Inactive', 'burst-statistics') , dateCreated: dateCreated }} // Replace with actual goal data
            onDelete={() => {
              removeGoal(id);
              setIsDeleteModalOpen(false);
            }}
            onClose={() => setIsDeleteModalOpen(false)}
        />
      </div>
  );
};
export default GoalSetup;