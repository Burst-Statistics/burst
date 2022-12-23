import {__} from '@wordpress/i18n';
import {
  useState,
  useEffect,
} from 'react';
import Tooltip from '@mui/material/Tooltip';

import * as burst_api from '../utils/api';
import Icon from '../utils/Icon';
import {endOfDay, format, intervalToDuration, startOfDay} from 'date-fns';
import {formatTime, formatNumber} from '../utils/formatting';
import {UseTodayStats} from '../data/dashboard/today';

const TodayBlock = () => {
  const {liveVisitors, todayData, fetchLiveVisitors} = UseTodayStats();

  // set timeout to fetch live visitors
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveVisitors();
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  // useEffect(() => {
  //     getData(startDate, endDate);
  //     const interval = setInterval(() => {
  //         getData(startDate, endDate);
  //         // startAnimation(5000);
  //     }, 5000)
  //
  //     return () => clearInterval(interval);
  //     }, [startDate, endDate]
  // )

  // function getData(startDate, endDate){
  //     getTodayData(startDate, endDate).then((response) => {
  //         let data = response;
  //         data.live.icon = selectVisitorIcon(data.live.value);
  //         data.today.icon = selectVisitorIcon(data.today.value);
  //         // map data formatNumber
  //         for (const [key, value] of Object.entries(data)) {
  //             if (key === 'timeOnPage' ) {
  //                 data[key].value = formatTime(value.value);
  //             } else {
  //                 data[key].value = formatNumber(value.value);
  //             }
  //         }
  //         setTodayData(data);
  //     }).catch((error) => {
  //         console.error(error);
  //     });
  // }
  //
  // function getTodayData(startDate, endDate, args= []){
  //     return burst_api.getData('today', startDate, endDate, 'custom',
  // args).then( ( response ) => { return response; }); }

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

  const delayTooltip = 200;
  return (
      <>
        <div className="burst-today">
          <div className="burst-today-select">
            <Tooltip arrow title={todayData.live.tooltip} enterDelay={delayTooltip}>
              <div className="burst-today-select-item">
                <Icon name={todayData.live.icon} size="23"/>
                <h2>{liveVisitors}</h2>
                <span><Icon name="live" size="12" color={'red'}/> Live</span>
              </div>
            </Tooltip>
            <Tooltip arrow title={todayData.today.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-select-item">
                <Icon name={todayData.today.icon} size="23"/>
                <h2>{todayData.today.value}</h2>
                <span><Icon name="total" size="13"
                            color={'green'}/> Total</span>
              </div>
            </Tooltip>
          </div>
          <div className="burst-today-list">
            <Tooltip arrow title={todayData.mostViewed.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-list-item">
                <Icon name="winner"/>
                <p className="burst-today-list-item-text">{todayData.mostViewed.title}</p>
                <p className="burst-today-list-item-number">{todayData.mostViewed.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={todayData.referrer.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-list-item">
                <Icon name="referrer"/>
                <p className="burst-today-list-item-text">{todayData.referrer.title}</p>
                <p className="burst-today-list-item-number">{todayData.referrer.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={todayData.pageviews.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-list-item">
                <Icon name="pageviews"/>
                <p className="burst-today-list-item-text">{todayData.pageviews.title}</p>
                <p className="burst-today-list-item-number">{todayData.pageviews.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={todayData.timeOnPage.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-list-item">
                <Icon name="time"/>
                <p className="burst-today-list-item-text">{todayData.timeOnPage.title}</p>
                <p className="burst-today-list-item-number">{todayData.timeOnPage.value}</p>
              </div>
            </Tooltip>
          </div>
        </div>
      </>
  );
};
export default TodayBlock;