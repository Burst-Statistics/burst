import React, {useState} from '@wordpress/element';
import Icon from '../../../utils/Icon';
import Tooltip from '../../common/Tooltip';
import {__} from '@wordpress/i18n';
import GoalField from './GoalField';
import EditableText from '../Fields/EditableText';
import {ToggleControl} from '@wordpress/components';
import DeleteGoalModal from './DeleteGoalModal';
import {setOption} from '../../../utils/api';
import {useEffect} from "react";
import {updateFieldsListWithConditions} from "../../../store/useFieldsStore";

const GoalSetup = ({ goal, goalFields, setGoalValue, deleteGoal, onUpdate }) => {
  if (!goalFields) {
    return null;
  }
  const [status, setStatus] = useState(goal.status === 'active');
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if ( goalFields.length>0 ) {
      //give each field a value property
      let updatedFields = goalFields.map(field => {
        let goalField = {...field};
        goalField.value = goal[goalField.id];
        return goalField;
      });
      setFields(updateFieldsListWithConditions(updatedFields));

    }
  }, [goalFields, goal]);

  function handleStatusToggle(value) {
    if ( burst_settings.goals_information_shown == '0') {
      burst_settings.goals_information_shown = '1';
      setOption('goals_information_shown', true);

    }
    setStatus(value);
    setGoalValue(goal.id, 'status', value ? 'active' : 'inactive');
  }

  function handleTitleChange(value) {
    setGoalValue(goal.id, 'title', value);
  }
  let type = goal.type;
  let iconName = type && fields.type && fields.type.options && fields.type.options[type] ? fields.type.options[type].icon : 'eye';
  let title =  goal.title && goal.title.length>0 ? goal.title : ' ';
  let dateCreated = goal && goal.date_created !== undefined && goal.date_created > 1 ? goal.date_created : 1;
  return (
      <div className="burst-settings-goals__list__item">
        <details>
          <summary>
            <Icon name={iconName} size={20} />
            <span>
              <EditableText value={title}
                            id={goal.id}
                            defaultValue={__('New goal', 'burst-statistics')}
                            onChange={handleTitleChange}/>
            </span>
            <DeleteGoalModal
                goal={{ name: title, status: status ? __('Active', 'burst-statistics') : __('Inactive', 'burst-statistics') , dateCreated: dateCreated }} // Replace with actual goal data
                deleteGoal={() => {
                  deleteGoal(goal.id);
                }}
            />
            <Tooltip content={status ? __('Click to de-activate', 'burst-statistics') : __('Click to activate', 'burst-statistics')}>
              <span className="burst-click-to-filter">
                <ToggleControl
                    checked={status}
                    onChange={handleStatusToggle}
                />
              </span>
            </Tooltip>

            <Icon name={'chevron-down'} size={18}/>
          </summary>
          <div className="burst-settings-goals__list__item__fields">
            {fields.length>0 && fields.map((field, i) => {
              return (
                  <GoalField
                      key={i}
                      field={field}
                      goal={goal}
                      value={field.value}
                      setGoalValue={setGoalValue}
                  />
              );
            })}
          </div>
        </details>
      </div>
  );
};
export default GoalSetup;