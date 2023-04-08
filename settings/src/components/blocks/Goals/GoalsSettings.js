import {__} from '@wordpress/i18n';
import GoalSetup from './GoalSetup';
import {useEffect, useState} from 'react';
import {useGoals} from '../../../store/useGoalsStore';
import Icon from '../../../utils/Icon';

const GoalsSettings = (props) => {
  const goalFields = useGoals((state) => state.goalFields);
  const addGoal = useGoals((state) => state.addGoal);

  // maybe add a default goal
  return (
      <>
        <div className="burst-burst-settings-goals">
          <div className="burst-settings-goals__introduction">
            {__('Goals are a great way to track your progress and keep you motivated.')}
          </div>
          <div className="burst-settings-goals__list">
            {Object.keys(goalFields).map((id, index) => {
              return (
                  <GoalSetup
                      key={id}
                      id={id}
                  />
              );
            })}
            { burst_settings.is_pro || Object.keys(goalFields).length === 0 && (
                <div className={'burst-settings-goals__add-goal'}>
                  <button
                      className={'burst-button burst-button--secondary'}
                      onClick={() => {
                        addGoal();
                      }}
                  >
                    {__('Add goal', 'burst-statistics')}
                  </button>
                </div>
            )}
            { ! burst_settings.is_pro && (
                <div className={'burst-settings-goals__upgrade'}>
                  <Icon name={'goals'} size={24} />
                  <h4>{__('Want more goals?')}</h4>
                  <div className="burst-divider" />
                  <p>{__('Upgrade to Burst Pro')}</p>
                  <a
                      href={'https://burst-statistics.com/pricing/'}
                      target={'_blank'}
                      className={'burst-button burst-button--black'}
                  >
                    {__('Upgrade to Pro', 'burst-statistics')}
                  </a>
                </div>
            )}

          </div>
        </div>
      </>
  );
};

export default GoalsSettings;