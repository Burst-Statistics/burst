import {__} from '@wordpress/i18n';
import GoalSetup from './GoalSetup';
import {useEffect, useState} from 'react';
import {useGoals} from '../../data/settings/goals';
import Icon from '../../utils/Icon';

const GoalsSettings = (props) => {
  const goalFields = useGoals((state) => state.goalFields);

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
                      key={index}
                      id={id}
                  />
              );
            })}
            {burst_settings.pro_plugin_active && ( // @todo met rogier checken hoe het in CMPLZ gaat
                <div className={'burst-settings-goals__add-goal'}>
                  <button
                      className={'button button-primary'}
                      onClick={() => {
                        addGoal();
                      }}
                  >
                    {__('Add goal', 'complianz-gdpr')}
                  </button>
                </div>
            )}
            { ! burst_settings.pro_plugin_active && ( // @todo met rogier checken hoe het in CMPLZ gaat
                <div className={'burst-settings-goals__upgrade'}>
                  <Icon name={'goals'} size={24} />
                  <h4>{__('Want more goals?')}</h4>
                  <div className="burst-divider" />
                  <p>{__('Upgrade to Burst Pro')}</p>
                  <a
                      href={'https://burst-statistics.com/pricing/'}
                      target={'_blank'}
                      className={'button button-black'}
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