import {__} from '@wordpress/i18n';
import {
  useState,
  useEffect,
} from 'react';
import Tooltip from '@mui/material/Tooltip';

import * as burst_api from '../utils/api';
import Icon from '../utils/Icon';
import {
  endOfDay,
  format,
  startOfDay,
} from 'date-fns';
import {formatTime, formatNumber, getPercentage} from '../utils/formatting';
import {useGoalsStats} from '../data/dashboard/goals';

const GoalsBlock = () => {
  const {todayGoals, fetchTodayGoals, totalGoalsData, fetchTotalGoalsData} = useGoalsStats();

  // set timeout to fetch live visitors
  useEffect(() => {
    fetchTodayGoals();
    fetchTotalGoalsData();
    const interval = setInterval(() => {
      fetchTodayGoals();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function selectVisitorIcon(value) {
    value = parseInt(value);
    if (value > 100) {
      return 'visitors-crowd';
    }
    else if (value > 10) {
      return 'visitors';
    }
    else {
      return 'visitor';
    }
  }

  let todayIcon = selectVisitorIcon(todayGoals);
  let totalIcon = selectVisitorIcon(totalGoalsData.total.value);
  const delayTooltip = 200;
  return (
      <>
        <div className="burst-goals">
          <div className="burst-goals-select">
            <Tooltip arrow title={totalGoalsData.today.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-select-item">
                <Icon name={todayIcon} size="23"/>
                <h2>{todayGoals}</h2>
                <span><Icon name="sun" size="13"/> Today</span>
              </div>
            </Tooltip>
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
            <Tooltip arrow title={totalGoalsData.visitors.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="visitors"/>
                <p className="burst-goals-list-item-text">{totalGoalsData.visitors.title}</p>
                <p className="burst-goals-list-item-number">{totalGoalsData.visitors.value}</p>
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
            <Tooltip arrow title={totalGoalsData.timeToGoal.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="time"/>
                <p className="burst-goals-list-item-text">{totalGoalsData.timeToGoal.title}</p>
                <p className="burst-goals-list-item-number">{totalGoalsData.timeToGoal.value}</p>
              </div>
            </Tooltip>
          </div>
          <div className={'burst-grid-item-footer'}>
            <p className={'burst-small-text burst-flex-push-right'}>Since <span>{totalGoalsData.dateStart}</span>
            </p>
          </div>
        </div>

      </>
  );
};
export default GoalsBlock;