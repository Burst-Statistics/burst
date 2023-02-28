import React from 'react';
import {useGoals} from '../data/settings/goals';
import {useGoalsStats} from '../data/dashboard/goals';
import Icon from '../utils/Icon';

const GoalsHeader = () => {
  const {setSelectedGoalId} = useGoalsStats();
  const {goalFields} = useGoals();

  // if goalValues is an empty array, return null
  if (!Object.keys(goalFields).length > 0) {
    return <Icon name={'loading'} />;
  }

  // get first item in object which is not 0 index
  const firstItem = Object.keys(goalFields)[0];

  const handleChange = (event) => {
    setSelectedGoalId(event.target.value);
  }

  return (
      <div className={"burst-goals-controls-flex"}>
        {Object.keys(goalFields).length === 1 &&
            <><p>{goalFields[firstItem].goal_title.value}</p><span
                className={'burst-divider'}></span> <Icon name={goalFields[firstItem].goal_type.options[goalFields[firstItem].goal_type.value].icon} />
            </>}
        {Object.keys(goalFields).length > 1 &&  <select onChange={handleChange}>
          {Object.entries(goalFields).map(([key, goal]) => (
          <option key={key} value={key}>{goal.goal_title.value}</option>
          ))}
          </select>
        }
      </div>
  );
};

export default GoalsHeader;
