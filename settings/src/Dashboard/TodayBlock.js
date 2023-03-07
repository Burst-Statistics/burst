import {__} from '@wordpress/i18n';
import {
    formatTime,
    formatNumber,
} from '../utils/formatting';
import {
    useState,
    useEffect
} from '@wordpress/element';
import Tooltip from '@mui/material/Tooltip';

import * as burst_api from '../utils/api';
import Icon from '../utils/Icon';
import {endOfDay, format, intervalToDuration, startOfDay} from 'date-fns';
import {useTodayStats} from '../data/dashboard/today';
import {useRef} from 'react';

const TodayBlock = () => {
  const {liveVisitors, todayData, fetchLiveVisitors, fetchTodayData} = useTodayStats();

  useEffect(() => {
    // const intervalLive = setInterval(() => {
    //   fetchLiveVisitors();
    // }, 3000);
    //
    // const intervalToday = setInterval(() => {
    //   fetchTodayData();
    // }, 15000);
    //
    // return () => {
    //   clearInterval(intervalLive);
    //   clearInterval(intervalToday);
    // };
  }, []);

    // get currentDate
    const currentDate = new Date();

    // get client's timezone offset in minutes
    const clientTimezoneOffsetMinutes = currentDate.getTimezoneOffset();

    // convert client's timezone offset from minutes to seconds
    const clientTimezoneOffsetSeconds = clientTimezoneOffsetMinutes * -60;

    // get current unix timestamp
    const currentUnix = Math.floor(currentDate.getTime() / 1000);
    // add burst_settings.gmt_offset x hour and client's timezone offset in
    // seconds to currentUnix
    const currentUnixWithOffsets = currentUnix +
        (burst_settings.gmt_offset * 3600) - clientTimezoneOffsetSeconds;

    // get current date by currentUnixWithOffsets
    const currentDateWithOffset = new Date(currentUnixWithOffsets * 1000);

    const startDate = format(startOfDay(currentDateWithOffset), 'yyyy-MM-dd');
    const endDate = format(endOfDay(currentDateWithOffset), 'yyyy-MM-dd');


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
  let liveIcon = selectVisitorIcon(liveVisitors);
  let todayIcon = selectVisitorIcon(todayData.today.value);
  const delayTooltip = 200;
  return (
      <>
        <div className="burst-today">
          <div className="burst-today-select">
            <Tooltip arrow title={todayData.live.tooltip} enterDelay={delayTooltip}>
              <div className="burst-today-select-item">
                <Icon name={liveIcon} size="23"/>
                <h2>{liveVisitors}</h2>
                <span><Icon name="live" size="12" color={'red'}/> Live</span>
              </div>
            </Tooltip>
            <Tooltip arrow title={todayData.today.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-select-item">
                <Icon name={todayIcon} size="23"/>
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