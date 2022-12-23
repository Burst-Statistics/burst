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

const GoalsBlock = () => {
  const [goals, setGoalsData] = useState(
      {
        today: {
          title: __('Today', 'burst-statistics'),
          value: '-',
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
        visitors: {
          title: '-',
          value: '-',
        },
        conversionPercentage: {
          title: '-',
          value: '-',
        },
        timeToGoal: {
          title: '-',
          value: '-',
        },
        dateStart: '-',
      },
  );

  const startDate = format(startOfDay(new Date()), 'yyyy-MM-dd');
  const endDate = format(endOfDay(new Date()), 'yyyy-MM-dd');

  // useEffect(() => {
  //       getData(startDate, endDate);
  //       const interval = setInterval(() => {
  //         getData(startDate, endDate);
  //         // startAnimation(5000);
  //       }, 30000);
  //
  //       return () => clearInterval(interval);
  //     }, [startDate, endDate],
  // );

  function getData(startDate, endDate) {
    getGoalsData(startDate, endDate).then((response) => {
      let data = response;
      data.today.icon = selectVisitorIcon(data.today.value);
      data.total.icon = selectVisitorIcon(data.total.value);
      // map data formatNumber
      for (const [key, value] of Object.entries(data)) {
        if (key === 'timeToGoal') {
          data[key].value = formatTime(value.value);
        }
        else if (key === 'conversionPercentage') {
          data[key].value = getPercentage(value.value, 1);
        }
        else {
          data[key].value = formatNumber(value.value);
        }
      }
      // new date from unix timestamp
      const currentYear = new Date().getFullYear();
      const dateStart = new Date(data.dateStart * 1000);
      const formatString = dateStart.getFullYear() === currentYear
          ? 'MMMM dd'
          : 'MMMM dd, yyyy';
      data.dateStart = format(dateStart, formatString);

      setGoalsData(data);
    }).catch((error) => {
      console.error(error);
    });
  }

  function getGoalsData(startDate, endDate, args = []) {
    return burst_api.getData('goals', startDate, endDate, 'custom', args).
        then((response) => {
          return response;
        });
  }

  function selectVisitorIcon(value) {
    value = parseInt(value);
    if (value > 100) {
      return 'goals';
    }
    else if (value > 10) {
      return 'goals';
    }
    else {
      return 'goals';
    }
  }

  const delayTooltip = 200;
  return (
      <>
        <div className="burst-goals">
          <div className="burst-goals-select">
            <Tooltip arrow title={goals.today.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-select-item">
                <Icon name={goals.today.icon} size="23"/>
                <h2>{goals.today.value}</h2>
                <span><Icon name="sun" size="13"/> Today</span>
              </div>
            </Tooltip>
            <Tooltip arrow title={goals.total.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-select-item">
                <Icon name={goals.total.icon} size="23"/>
                <h2>{goals.total.value}</h2>
                <span><Icon name="total" size="13"
                            color={'green'}/> Total</span>
              </div>
            </Tooltip>
          </div>
          <div className="burst-goals-list">
            <Tooltip arrow title={goals.topPerformer.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="winner"/>
                <p className="burst-goals-list-item-text">{goals.topPerformer.title}</p>
                <p className="burst-goals-list-item-number">{goals.topPerformer.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={goals.visitors.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="visitors"/>
                <p className="burst-goals-list-item-text">{goals.visitors.title}</p>
                <p className="burst-goals-list-item-number">{goals.visitors.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={goals.conversionPercentage.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="graph"/>
                <p className="burst-goals-list-item-text">{goals.conversionPercentage.title}</p>
                <p className="burst-goals-list-item-number">{goals.conversionPercentage.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={goals.timeToGoal.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-goals-list-item">
                <Icon name="time"/>
                <p className="burst-goals-list-item-text">{goals.timeToGoal.title}</p>
                <p className="burst-goals-list-item-number">{goals.timeToGoal.value}</p>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className={'burst-grid-item-footer'}>
          <p className={'burst-small-text burst-flex-push-right'}>Since <span>{goals.dateStart}</span>
          </p>
        </div>
      </>
  );
};
export default GoalsBlock;