import React from 'react';
import {useGoalsStore} from '../../store/useGoalsStore';
import {useDashboardGoalsStore} from '../../store/useDashboardGoalsStore';
import Icon from '../../utils/Icon';

const GoalsHeader = ({goalId, goals}) => {
  const setGoalId = useDashboardGoalsStore((state) => state.setGoalId);

  console.log('goalId', goalId);
  if (goalId === false) {
    return null;
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
        {Object.keys(goals).length === 1 &&
            <><p>{goals[firstItem].title}</p>
              {/*<span className={'burst-divider'}></span> <Icon name={goals.icon}/>*/}
            </>}
        {Object.keys(goals).length > 1 && <select onChange={handleChange}>
          {Object.entries(goals).map(([key, goal]) => (
              <option key={key} value={key}>{goal.title}</option>
          ))}
        </select>
        }
      </div>
  );
};

export default GoalsHeader;
