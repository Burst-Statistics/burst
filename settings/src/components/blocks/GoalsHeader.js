import React from '@wordpress/element';
import {useDashboardGoalsStore} from '../../store/useDashboardGoalsStore';
import Icon from '../../utils/Icon';
import {__} from '@wordpress/i18n';

const GoalsHeader = ({goals}) => {
  const setGoalId = useDashboardGoalsStore((state) => state.setGoalId);

  // if goalValues is an empty array, return null
  if ( goals.length === 0) {
    return <Icon name={'loading'} />;
  }

  const handleChange = (event) => {
    setGoalId(event.target.value);
  }

  return (
      <div className={'burst-goals-controls-flex'}>
        {goals.length === 1 && goals[0] &&
            <p>{goals[0].title}</p>
        }
        {goals.length > 1 && <select onChange={(e) => handleChange(e) }>
          {Object.entries(goals).map(([key, goal]) => (
              goal && typeof goal.title === 'string' ? (
                  <option key={key} value={goal.id}>{goal.title}</option>
              ) : <option key={key} value={key}>{__('Unknown title', 'burst-statistics')}</option>
          ))}
        </select>
        }
      </div>
  );
};

export default GoalsHeader;
