import {useGoalsStore} from '../../../store/useGoalsStore';
import useLicenseStore from '../../../store/useLicenseStore';
import {__} from '@wordpress/i18n';
import Icon from '../../../utils/Icon';
import GoalSetup from '../Goals/GoalSetup';
import {useEffect, useState} from '@wordpress/element';
import Pro from "../Fields/Pro";
import {useFields} from "../../../store/useFieldsStore";

const GoalsSettings = (props) => {
  const { goals, goalFields, predefinedGoals, addGoal, deleteGoal, updateGoal, addPredefinedGoal, setGoalValue } = useGoalsStore();
  const {licenseStatus} = useLicenseStore();
  const [predefinedGoalsVisible, setPredefinedGoalsVisible] = useState(false);
    const getFieldValue = useFields((state) => state.getFieldValue);
    const fieldsLoaded = useFields((state) => state.fieldsLoaded);
    const [cookieless, setCookieless] = useState(false);

    useEffect(() => {
        if (fieldsLoaded) {
            setCookieless(getFieldValue('enable_cookieless_tracking')==1);
        }
    }, [fieldsLoaded, getFieldValue('enable_cookieless_tracking') ]);

    const handleAddPredefinedGoal = async (goal) => {
        await addPredefinedGoal(goal.id, goal.type, cookieless );

        setPredefinedGoalsVisible(false);
    }

  let predefinedGoalsButtonClass = !predefinedGoals || predefinedGoals.length===0 ? 'burst-inactive' : '';
  return (
      <div className="burst-burst-settings-goals">
        <div className="burst-settings-goals__introduction">
          {__('Goals are a great way to track your progress and keep you motivated.', 'burst-statistics')}
        </div>
        <div className="burst-settings-goals__list">
          { goals.length>0 && goals.map((goal, index) => {
            return (
                <GoalSetup
                    key={index}
                    goal={goal}
                    goalFields={goalFields}
                    setGoalValue={setGoalValue}
                    deleteGoal={deleteGoal}
                    onUpdate={updateGoal}
                />
            );
          })}

          { ( licenseStatus === 'valid' || goals.length === 0 ) && (
              <div className={'burst-settings-goals__add-goal'}>
                  <button
                      className={'burst-button burst-button--secondary'}
                      onClick={addGoal}
                  >
                      {__('Add goal', 'burst-statistics')}
                  </button>
                  {/*<div className="burst-button-dropdown-container">*/}
                  {/*    <button*/}
                  {/*        className={ predefinedGoalsButtonClass+' burst-button burst-button--secondary'}*/}
                  {/*        onClick={() => setPredefinedGoalsVisible(!predefinedGoalsVisible) }*/}
                  {/*    >*/}
                  {/*        {__('Add predefined goal', 'burst-statistics')} <Pro pro={{url:'https://burst-statistics.com/predefined-goals'}} id={'predefined-goals'}/>*/}
                  {/*        <Icon name={predefinedGoalsVisible? "chevron-up" : "chevron-down"} color={'grey'}/>*/}
                  {/*    </button>*/}
                  {/*    {*/}
                  {/*        predefinedGoalsVisible && <div className="burst-button-dropdown">*/}
                  {/*            { !predefinedGoals || predefinedGoals.length ===0 &&*/}
                  {/*                    <div className={'burst-button-dropdown__row'}>*/}
                  {/*                        {__("No predefined goals available", "burst-statistics")}*/}
                  {/*                    </div>*/}
                  {/*            }*/}
                  {/*            { predefinedGoals && predefinedGoals.length>0 && predefinedGoals.map((goal, index) => {*/}
                  {/*                return (*/}
                  {/*                        <div key={index} className={goal.type === 'hook' && cookieless ? 'burst-button-dropdown__row burst-inactive' : 'burst-button-dropdown__row'} onClick={() => handleAddPredefinedGoal(goal) }>*/}
                  {/*                            {goal.title}*/}
                  {/*                            {goal.type === 'hook' && cookieless && <>*/}
                  {/*                              <Icon name={'error'} color={'black'} tooltip={__("Not available in combination with cookieless tracking", 'burst-statistics')}/>*/}
                  {/*                            </>}*/}
                  {/*                        </div>*/}
                  {/*                    )*/}
                  {/*                })*/}
                  {/*            }*/}
                  {/*      </div>*/}
                  {/*    }*/}
                  {/*</div>*/}
              </div>
          )}
            {!burst_settings.is_pro && (
                <div className={'burst-settings-goals__upgrade'}>
                    <Icon name={'goals'} size={24} color="grey"/>
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