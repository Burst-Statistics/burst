import {__} from '@wordpress/i18n';
import {useState, useEffect, useRef} from 'react';
import Tooltip from '@mui/material/Tooltip';
import ClickToFilter from './ClickToFilter';
import Icon from '../../utils/Icon';
import {
  endOfDay,
  format,
  startOfDay,
} from 'date-fns';
import {
  formatTime,
  formatNumber,
  getPercentage,
  getRelativeTime,
} from '../../utils/formatting';
import GoalStatus from './GoalStatus';
import {useDashboardGoalsStore} from '../../store/useDashboardGoalsStore';
import {useGoalsStore} from '../../store/useGoalsStore';
import GridItem from '../common/GridItem';
import GoalsHeader from './GoalsHeader';
import {useTodayStore} from '../../store/useTodayStore';

const GoalsBlock = () => {
  const live = useDashboardGoalsStore((state) => state.live);
  const incrementUpdateLive = useDashboardGoalsStore((state) => state.incrementUpdateLive);

  const data = useDashboardGoalsStore((state) => state.data);
  const loading = useDashboardGoalsStore((state) => state.loading);
  const setLoading = useDashboardGoalsStore((state) => state.setLoading);
  const incrementUpdateData = useDashboardGoalsStore((state) => state.incrementUpdateData);

  const goalId = useDashboardGoalsStore((state) => state.goalId);
  const setGoalId = useDashboardGoalsStore((state) => state.setGoalId);
  const goals = useGoalsStore((state) => state.goals);
  const [noGoals, setNoGoals] = useState(false);
  useEffect(() => {
    if (goalId === false) {
      // get the key of first item from the goals list
      const firstGoal = Object.keys(goals)[0];
      if (firstGoal) {
        setGoalId(firstGoal);
      }
    }
    if (Object.keys(goals).length === 0) {
      setNoGoals(true);
      setLoading(false);
    } else {
      setNoGoals(false);
    }
  }, [goalId, goals]);

  useEffect(() => {
    if ( !noGoals ) {
      let timer1, timer2;

      const handleVisibilityChange = () => {
        if (document.hidden) {
          clearInterval(timer1);
          clearInterval(timer2);
        }
        else {
          timer1 = setInterval(() => {
            incrementUpdateLive();
          }, 5000);

          timer2 = setInterval(() => {
            incrementUpdateData();
          }, 10000);
        }
      }

      // add event listener for visibility change
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // start the intervals
      handleVisibilityChange();

      // cleanup the event listener
      return () => {
        clearInterval(timer1);
        clearInterval(timer2);
        document.removeEventListener("visibilitychange",
            handleVisibilityChange);
      }
    }
  }, [noGoals]);

  function selectGoalIcon(value) {
    value = parseInt(value);
    if (value > 10) {
      return 'goals';
    } else if (value > 0) {
      return 'goals';
    } else {
      return 'goals-empty';
    }
  }

  let todayIcon = selectGoalIcon(live);
  let totalIcon = selectGoalIcon(data.total.value);
  const delayTooltip = 200;
  let loadingClass = loading ? 'burst-loading' : '';

  let startDate = false;
  let endDate = false;
  if (data.dateStart > 0 ) {
    startDate = data.dateStart;
    if (data.dateEnd > 0) {
      endDate = data.dateEnd;
    }
  }

  let today = format(new Date(), 'yyyy-MM-dd');
  return (
      <GridItem
          className={'border-to-border burst-goals'}
          title={__('Goals', 'burst-statistics')}
          controls={<GoalsHeader goalId={goalId} goals={goals} />}
          footer={ !noGoals && (
              <>
                <a className={'burst-button burst-button--secondary'}
                   href={'#settings/goals'}>{__('View setup',
                    'burst-statistics')}</a>
                <div className={'burst-flex-push-right'}>
                  <GoalStatus data={data}/>
                </div>
              </>
          )}
      >
        <div className={'burst-goals burst-loading-container ' + loadingClass}>
          {noGoals && (
              <div className="information-overlay">
                <div className="information-overlay-container">
                  <h4>{__('Goals', 'burst-statistics')}</h4>
                  <p>{__('The all new goals! Keep track of customizable goals and get valuable insights. Add your first goal!', 'burst-statistics')}</p>
                  <a href="#settings/goals" className="burst-button burst-button--primary">{__('Create my first goal', 'burst-statistics')}</a>
                </div>
              </div>
          )}
          <div className="burst-goals-select">
            <ClickToFilter filter="goal_id" filterValue={data.goalId}
                           label={data.today.tooltip+ __('Goal and today', 'burst-statistics')} startDate={today}>
              <div className="burst-goals-select-item">
                <Icon name={todayIcon} size="23"/>
                <h2>{live}</h2>
                <span><Icon name="sun" color={'yellow'} size="13"/> Today</span>
              </div>
            </ClickToFilter>
            <ClickToFilter filter="goal_id" filterValue={data.goalId}
                           label={data.today.tooltip + __('Goal and the start date', 'burst-statistics')} startDate={startDate} endDate={endDate}>
              <div className="burst-goals-select-item">
                <Icon name={totalIcon} size="23"/>
                <h2>{data.total.value}</h2>
                <span><Icon name="total" size="13"
                            color={'green'}/> Total</span>
              </div>
            </ClickToFilter>
          </div>
          <div className="burst-goals-list">
            <Tooltip arrow title={data.topPerformer.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="winner"/>
                <p className="burst-goals-list-item-text">{data.topPerformer.title}</p>
                <p className="burst-goals-list-item-number">{data.topPerformer.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.pageviews.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="pageviews"/>
                <p className="burst-goals-list-item-text">{data.pageviews.title}</p>
                <p className="burst-goals-list-item-number">{data.pageviews.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.conversionPercentage.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="graph"/>
                <p className="burst-goals-list-item-text">{data.conversionPercentage.title}</p>
                <p className="burst-goals-list-item-number">{data.conversionPercentage.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.bestDevice.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name={data.bestDevice.icon}/>
                <p className="burst-goals-list-item-text">{data.bestDevice.title}</p>
                <p className="burst-goals-list-item-number">{data.bestDevice.value}</p>
              </div>
            </Tooltip>
          </div>
        </div>
      </GridItem>
  );
};
export default GoalsBlock;