import {useGoalsStore} from '../../../store/useGoalsStore';
import {useGoalFieldsStore} from '../../../store/useGoalFieldsStore';
import useLicenseStore from '../../../store/useLicenseStore';
import {__} from '@wordpress/i18n';
import Icon from '../../../utils/Icon';
import GoalSetup from '../Goals/GoalSetup';
import {useEffect} from 'react';

const GoalsSettings = (props) => {
  const { goals, addGoal, removeGoal, updateGoal } = useGoalsStore();
  const {goalFields, setGoalValue} = useGoalFieldsStore();
  const {licenseStatus} = useLicenseStore();

  useEffect(() => {
  }, [goals]);

  return (
      <div className="burst-burst-settings-goals">
        <div className="burst-settings-goals__introduction">
          {__('Goals are a great way to track your progress and keep you motivated.', 'burst-statistics')}
        </div>
        <div className="burst-settings-goals__list">
          {Object.keys(goals).map((id, index) => {
            return (
                <GoalSetup
                    key={id}
                    id={id}
                    goal={goals[id]}
                    goalFields={goalFields[id]}
                    setGoalValue={setGoalValue}
                    onRemove={removeGoal}
                    onUpdate={updateGoal}
                />
            );
          })}

          { ( licenseStatus === 'valid' || Object.keys(goals).length === 0 ) && (
              <div className={'burst-settings-goals__add-goal'}>
                <button
                    className={'burst-button burst-button--secondary'}
                    onClick={addGoal}
                >
                  {__('Add goal', 'burst-statistics')}
                </button>
              </div>
          )}
          { ! burst_settings.is_pro && (
              <div className={'burst-settings-goals__upgrade'}>
                <Icon name={'goals'} size={24} />
                <h4>{__('Want more goals?', 'burst-statistics')}</h4>
                <div className="burst-divider" />
                <p>{__('Upgrade to Burst Pro', 'burst-statistics')}</p>
                <a
                    href={'https://burst-statistics.com/pricing/?src=plugin-burst-more-goals'}
                    target={'_blank'}
                    className={'burst-button burst-button--pro'}
                >
                  {__('Upgrade to Pro', 'burst-statistics')}
                </a>
              </div>
          )}

        </div>
      </div>
  );
};

export default GoalsSettings;