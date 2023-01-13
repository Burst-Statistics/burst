import {__} from '@wordpress/i18n';
import GoalSetup from './GoalSetup';
import {useEffect, useState} from 'react';
import {useGoals} from '../../data/settings/goals';

const GoalsSettings = (props) => {
  const { goalValues } = useGoals();
  // maybe add a default goal
  return (
      <>
        <div className="burst-burst-settings-goals">
          <div className="burst-settings-goals__introduction">
            {__('Goals are a great way to track your progress and keep you motivated. You can set goals for your daily, weekly, monthly and yearly targets.')}
          </div>
          <div className="burst-settings-goals__list">
            {Object.keys(goalValues).map((id, index) => {
              return (
                  <GoalSetup
                      key={index}
                      id={id}
                  />
              );
            })}
          </div>
        </div>
      </>
  );
};

export default GoalsSettings;