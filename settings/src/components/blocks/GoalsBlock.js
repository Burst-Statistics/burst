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
import {useGoalsStore} from '../../store/useDashboardGoalsStore';
import GridItem from '../common/GridItem';
import GoalsHeader from './GoalsHeader';
import {useTodayStore} from '../../store/useTodayStore';

const GoalsBlock = () => {
  // const fetchTodayGoals = useGoalsStore((state) => state.fetchTodayGoals);
  // const fetchTotalGoalsData = useGoalsStore(
  //     (state) => state.fetchTotalGoalsData);
  // const selectedGoalId = useGoalsStore((state) => state.selectedGoalId);
  // const todayGoals = useGoalsStore((state) => state.todayGoals);
  // const totalGoalsData = useGoalsStore((state) => state.totalGoalsData);
  // const [loading, setLoading] = useState(false);
  const live = useGoalsStore((state) => state.live);
  const incrementUpdateLive = useGoalsStore((state) => state.incrementUpdateLive);

  const data = useGoalsStore((state) => state.data);
  const loading = useGoalsStore((state) => state.loading);
  const incrementUpdateData = useGoalsStore((state) => state.incrementUpdateData);

  const goalId = useGoalsStore((state) => state.goalId);

  useEffect(() => {
    let timer1, timer2;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(timer1);
        clearInterval(timer2);
      } else {
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
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, []);

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
          controls={<GoalsHeader goalId={goalId} />}
          footer={(
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