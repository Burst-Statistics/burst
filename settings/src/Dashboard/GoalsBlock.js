import {__} from '@wordpress/i18n';
import {
  useState,
  useEffect,
} from 'react';
import Tooltip from '@mui/material/Tooltip';
import ClickToFilter from '../Statistics/ClickToFilter';

import * as burst_api from '../utils/api';
import Icon from '../utils/Icon';
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
} from '../utils/formatting';
import {useGoalsStats} from '../data/dashboard/goals';

const GoalsBlock = () => {
  const {selectedGoalId, todayGoals, fetchTodayGoals, totalGoalsData, fetchTotalGoalsData} = useGoalsStats();
  const [loading, setLoading] = useState(true);

  // set timeout to fetch live visitors
  useEffect(() => {
    setLoading(true);
    fetchTodayGoals(selectedGoalId);
    fetchTotalGoalsData(selectedGoalId);
    setLoading(false);
    const interval = setInterval(() => {
      fetchTodayGoals(selectedGoalId, true);
    }, 10000);
    return () => clearInterval(interval);
  }, [selectedGoalId]);

  function selectGoalIcon(value) {
    value = parseInt(value);
    if (value > 100) {
      return 'goals-crowd';
    }
    else if (value > 10) {
      return 'goals';
    }
    else {
      return 'goals';
    }
  }
  console.log(totalGoalsData);

  let todayIcon = selectGoalIcon(todayGoals);
  let totalIcon = selectGoalIcon(totalGoalsData.total.value);
  const delayTooltip = 200;
  let loadingClass = loading ? 'burst-loading' : '';
  return (
      <>
        <div className={"burst-goals burst-loading-container " + loadingClass}>
          <div className="burst-goals-select">
            <ClickToFilter filter="goal_id" filterValue={totalGoalsData.goalId} label={totalGoalsData.today.tooltip}>
              <div className="burst-goals-select-item">
                <Icon name={todayIcon} size="23"/>
                <h2>{todayGoals}</h2>
                <span><Icon name="sun" color={"yellow"} size="13"/> Today</span>
              </div>
            </ClickToFilter>
            <Tooltip arrow title={totalGoalsData.total.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-select-item">
                <Icon name={totalIcon} size="23"/>
                <h2>{totalGoalsData.total.value}</h2>
                <span><Icon name="total" size="13"
                            color={'green'}/> Total</span>
              </div>
            </Tooltip>
          </div>
          <div className="burst-goals-list">
            <Tooltip arrow title={totalGoalsData.topPerformer.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="winner"/>
                <p className="burst-goals-list-item-text">{totalGoalsData.topPerformer.title}</p>
                <p className="burst-goals-list-item-number">{totalGoalsData.topPerformer.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={totalGoalsData.pageviews.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="pageviews"/>
                <p className="burst-goals-list-item-text">{totalGoalsData.pageviews.title}</p>
                <p className="burst-goals-list-item-number">{totalGoalsData.pageviews.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={totalGoalsData.conversionPercentage.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="graph"/>
                <p className="burst-goals-list-item-text">{totalGoalsData.conversionPercentage.title}</p>
                <p className="burst-goals-list-item-number">{totalGoalsData.conversionPercentage.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={totalGoalsData.bestDevice.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name={totalGoalsData.bestDevice.icon} />
                <p className="burst-goals-list-item-text">{totalGoalsData.bestDevice.title}</p>
                <p className="burst-goals-list-item-number">{totalGoalsData.bestDevice.value}</p>
              </div>
            </Tooltip>
          </div>
          <div className={'burst-grid-item-footer'}>
            <p className={'burst-small-text burst-flex-push-right'}>{__('Activated', 'burst-statistics')} <span>
              {totalGoalsData.dateStart !== '-' && getRelativeTime(totalGoalsData.dateStart)}
              {totalGoalsData.dateStart === '-' && '-'}
            </span>
            </p>
          </div>
        </div>

      </>
  );
};
export default GoalsBlock;