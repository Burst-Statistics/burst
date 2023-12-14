import React from '@wordpress/element';
import {useGoalsStore} from '../../store/useGoalsStore';
import {useDashboardGoalsStore} from '../../store/useDashboardGoalsStore';
import Icon from '../../utils/Icon';
import {__} from '@wordpress/i18n';

const GoalsHeader = ({goalId, goals}) => {
  const setGoalId = useDashboardGoalsStore((state) => state.setGoalId);

  if (!goalId) {
    setGoalId(Object.keys(goals)[0]);
  }
  // if goalValues is an empty array, return null
  if (!Object.keys(goals).length > 0) {
    return <Icon name={'loading'} />;
  }

  // get first item in object which is not 0 index
  const firstItem = Object.keys(goals)[0];

  const handleChange = (event) => {
    setGoalId(event.target.value);
  }

  return (
      <div className={'burst-goals-controls-flex'}>
        {Object.keys(goals).length === 1 && goals[firstItem] &&
            <p>{goals[firstItem].title}</p>
        }
        {Object.keys(goals).length > 1 && <select onChange={handleChange}>
          {Object.entries(goals).map(([key, goal]) => (
              goal && typeof goal.title === 'string' ? (
                  <option key={key} value={key}>{goal.title}</option>
              ) : <option key={key} value={key}>{__('Unknown title', 'burst-statistics')}</option>
          ))}
        </select>
        }
      </div>
  );
};

export default GoalsHeader;
