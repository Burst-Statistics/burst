import {useGoalsStore} from '../../../store/useGoalsStore';
import {useGoalFieldsStore} from '../../../store/useGoalFieldsStore';
import {__} from '@wordpress/i18n';
import Icon from '../../../utils/Icon';
import GoalSetup from '../Goals/GoalSetup';
import {useEffect} from 'react';

const GoalsSettings = (props) => {
  const { goals, addGoal, removeGoal, updateGoal } = useGoalsStore();
  const {goalFields, setGoalValue} = useGoalFieldsStore();

  const handleAddGoal = () => {
    addGoal();
  };

  const handleRemoveGoal = (id) => {
    console.log('removing goal', id);
    removeGoal(id);
  };

  useEffect(() => {
    console.log('goals', goals);
  }, [goals]);

  return (

      <div className="burst-burst-settings-goals">
        <div className="burst-settings-goals__introduction">
          {__('Goals are a great way to track your progress and keep you motivated.')}
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
                    onRemove={handleRemoveGoal}
                    onUpdate={updateGoal}
                />
            );
          })}

          { burst_settings.is_pro || Object.keys(goals).length === 0 && (
              <div className={'burst-settings-goals__add-goal'}>
                <button
                    className={'burst-button burst-button--secondary'}
                    onClick={handleAddGoal}
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
  );
};

export default GoalsSettings;