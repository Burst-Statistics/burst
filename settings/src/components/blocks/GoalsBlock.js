import {__, setLocaleData} from '@wordpress/i18n';
import {useState, useEffect, useRef} from '@wordpress/element';
import Tooltip from '../common/Tooltip';
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
  getRelativeTime, getDateWithOffset,
} from '../../utils/formatting';
import GoalStatus from './GoalStatus';
import {useDashboardGoalsStore} from '../../store/useDashboardGoalsStore';
import {useGoalsStore} from '../../store/useGoalsStore';
import GridItem from '../common/GridItem';
import GoalsHeader from './GoalsHeader';
import {setOption} from '../../utils/api';
import {useQueries} from '@tanstack/react-query';
import getLiveGoals from '../../api/getLiveGoals';
import getGoalsData from '../../api/getGoalsData';

function selectGoalIcon(value) {
  value = parseInt(value);
  if (value > 10) {
    return 'goals';
  }
  else if (value > 0) {
    return 'goals';
  }
  else {
    return 'goals-empty';
  }
}

const GoalsBlock = () => {
  const [interval, setInterval] = useState(5000);
  const goalId = useDashboardGoalsStore((state) => state.goalId);
  const setGoalId = useDashboardGoalsStore((state) => state.setGoalId);

  const goals = useGoalsStore((state) => state.goals);
  const currentDateWithOffset = getDateWithOffset();
  const startDate = format(startOfDay(currentDateWithOffset), 'yyyy-MM-dd');
  const endDate = format(endOfDay(currentDateWithOffset), 'yyyy-MM-dd');

  useEffect(() => {
    if (!goalId) {
      //get first entry of the goals array
      let firstGoal = goals.hasOwnProperty(0) ? goals[0] : false;
      if ( firstGoal ) {
        setGoalId(goals[0].id);
      }
    }
  },[goals]);

  let goalStart = goals[goalId] && goals[goalId].date_start;
  let goalEnd = goals[goalId] && goals[goalId].date_end;

  if (goalStart == 0 || goalStart === undefined) {
    goalStart = startDate;
  }
  if (goalEnd == 0 || goalEnd === undefined) {
    goalEnd = endDate;
  }

  const args = {
    goal_id: goalId,
    startDate: startDate,
    endDate: endDate,
  };
  const placeholderData = {
    today: {
      title: __('Today', 'burst-statistics'),
      icon: 'goals',
    },
    total: {
      title: __('Total', 'burst-statistics'),
      value: '-',
      icon: 'goals',
    },
    topPerformer: {
      title: '-',
      value: '-',
    },
    conversionMetric: {
      title: '-',
      value: '-',
      icon: 'visitors',
    },
    conversionPercentage: {
      title: '-',
      value: '-',
    },
    bestDevice: {
      title: '-',
      value: '-',
      icon: 'desktop',
    },
    dateCreated: 0,
    dateStart: 0,
    dateEnd: 0,
    status: 'inactive',
  };

  const queries = useQueries({
        queries: [
          {
            queryKey: ['live-goals', goalId],
            queryFn: () => getLiveGoals(args),
            refetchInterval: interval, // @todo: make this configurable
            placeholderData: '-',
            onError: (error) => {
              setInterval(0);
            },
          },
          {
            queryKey: ['goals', goalId],
            queryFn: () => getGoalsData(args),
            refetchInterval: interval * 2,
            placeholderData: placeholderData,
            onError: (error) => {
              setInterval(0);
            },
          },
        ],
      },
  );

  const onGoalsInfoClick = () => {
    return () => {
      burst_settings.goals_information_shown = '1';
      setOption('goals_information_shown', true);
      // change the #settings/goals to #settings/goals/add
      window.location.hash = '#settings/goals';
    };
  };

  const live = queries[0].data;
  let data = queries[1].data;
  if (queries.some((query) => query.isError)) {
    data = placeholderData;
  }
  const todayIcon = selectGoalIcon(live);
  const totalIcon = selectGoalIcon(data.today.value);
  let today = format(currentDateWithOffset, 'yyyy-MM-dd');
  return (
      <GridItem
          className={'border-to-border burst-goals'}
          title={__('Goals', 'burst-statistics')}
          controls={<GoalsHeader goalId={goalId} goals={goals}/>}
          footer={ goals.length !== 0 && (
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
        <div className={'burst-goals burst-loading-container'}>
          {burst_settings.goals_information_shown !== '1' && (
              <div className="information-overlay">
                <div className="information-overlay-container">
                  <h4>{__('Goals', 'burst-statistics')}</h4>
                  <p>{__(
                      'Keep track of customizable goals and get valuable insights. Add your first goal!',
                      'burst-statistics')}</p>
                  <p><a
                      href={'https://burst-statistics.com/how-to-set-goals/'}>{__(
                      'Learn how to set your first goal',
                      'burst-statistics')}</a></p>
                  <a onClick={onGoalsInfoClick()}
                     className="burst-button burst-button--primary">{__(
                      'Create my first goal', 'burst-statistics')}</a>
                </div>
              </div>
          )}
          <div className="burst-goals-select">
            <ClickToFilter filter="goal_id" filterValue={data.goalId}
                           label={data.today.tooltip +
                               __('Goal and today', 'burst-statistics')}
                           startDate={today}>
              <div className="burst-goals-select-item">
                <Icon name={todayIcon} size="23"/>
                <h2>{live}</h2>
                <span><Icon name="sun" color={'yellow'} size="13"/> {__('Today',
                    'burst-statistics')}</span>
              </div>
            </ClickToFilter>
            <ClickToFilter filter="goal_id" filterValue={data.goalId}
                           label={data.today.tooltip +
                               __('Goal and the start date',
                                   'burst-statistics')}
                           startDate={goalStart}
                           endDate={goalEnd}>
              <div className="burst-goals-select-item">
                <Icon name={totalIcon} size="23"/>
                <h2>{data.total.value}</h2>
                <span><Icon name="total" size="13"
                            color={'green'}/> {__('Total', 'burst-statistics')}</span>
              </div>
            </ClickToFilter>
          </div>
          <div className="burst-goals-list">
            <Tooltip content={data.topPerformer.tooltip}>
              <div className="burst-goals-list-item burst-tooltip-topPerformer"
                  >
                <Icon name="winner"/>
                <p className="burst-goals-list-item-text">{decodeURI(
                    data.topPerformer.title)}</p>
                <p className="burst-goals-list-item-number">{data.topPerformer.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.conversionMetric.tooltip}>
              <div className="burst-goals-list-item">
                <Icon name={data.conversionMetric.icon} />
                <p className="burst-goals-list-item-text">{data.conversionMetric.title}</p>
                <p className="burst-goals-list-item-number">{data.conversionMetric.value}</p>
              </div>
            </Tooltip>
            <Tooltip content={data.conversionPercentage.tooltip}>
              <div
                  className="burst-goals-list-item burst-tooltip-conversionPercentage"
                 >
                <Icon name="graph"/>
                <p className="burst-goals-list-item-text">{data.conversionPercentage.title}</p>
                <p className="burst-goals-list-item-number">{data.conversionPercentage.value}</p>
              </div>
            </Tooltip>
            <Tooltip content={data.bestDevice.tooltip}>
              <div className="burst-goals-list-item burst-tooltip-bestDevice">
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