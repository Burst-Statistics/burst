import {__} from '@wordpress/i18n';
import {
  formatTime,
  formatNumber, getRelativeTime,
} from '../../utils/formatting';
import {
    useState,
    useEffect
} from '@wordpress/element';
import Tooltip from '@mui/material/Tooltip';

import * as burst_api from '../../utils/api';
import Icon from '../../utils/Icon';
import {endOfDay, format, intervalToDuration, startOfDay} from 'date-fns';
import {useTodayStore} from '../../store/useTodayStore';
import {useRef} from 'react';
import GridItem from '../common/GridItem';

const TodayBlock = () => {
  const live = useTodayStore((state) => state.live);
  const incrementUpdateLive = useTodayStore((state) => state.incrementUpdateLive);
  const data = useTodayStore((state) => state.data);
  const incrementUpdateData = useTodayStore((state) => state.incrementUpdateData);

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
  let liveIcon = selectVisitorIcon(live);
  let todayIcon = selectVisitorIcon(data.today.value);
  const delayTooltip = 200;
  return (
      <GridItem
          className={'border-to-border burst-today'}
          title={__('Today', 'burst-statistics')}
      >
        <div className="burst-today">
          <div className="burst-today-select">
            <Tooltip arrow title={data.live.tooltip} enterDelay={delayTooltip}>
              <div className="burst-today-select-item">
                <Icon name={liveIcon} size="23"/>
                <h2>{live}</h2>
                <span><Icon name="live" size="12" color={'red'}/> {__('Live', 'burst-statistics')}</span>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.today.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-select-item">
                <Icon name={todayIcon} size="23"/>
                <h2>{data.today.value}</h2>
                <span><Icon name="total" size="13"
                            color={'green'}/> {__('Total', 'burst-statistics')}</span>
              </div>
            </Tooltip>
          </div>
          <div className="burst-today-list">
            <Tooltip arrow title={data.mostViewed.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-list-item">
                <Icon name="winner"/>
                <p className="burst-today-list-item-text">{decodeURI(data.mostViewed.title)}</p>
                <p className="burst-today-list-item-number">{data.mostViewed.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.referrer.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-list-item">
                <Icon name="referrer"/>
                <p className="burst-today-list-item-text">{decodeURI(data.referrer.title)}</p>
                <p className="burst-today-list-item-number">{data.referrer.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.pageviews.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-list-item">
                <Icon name="pageviews"/>
                <p className="burst-today-list-item-text">{data.pageviews.title}</p>
                <p className="burst-today-list-item-number">{data.pageviews.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.timeOnPage.tooltip}
                     enterDelay={delayTooltip}>
              <div className="burst-today-list-item">
                <Icon name="time"/>
                <p className="burst-today-list-item-text">{data.timeOnPage.title}</p>
                <p className="burst-today-list-item-number">{data.timeOnPage.value}</p>
              </div>
            </Tooltip>
          </div>
          {/*<div className={'burst-grid-item-footer'}>*/}
          {/*    <a className={'burst-button burst-button--secondary'} href={'#statistics'}>{ __( "View", "burst-statistics" ) }</a>*/}
          {/*</div>*/}
        </div>
      </GridItem>
  );
};
export default TodayBlock;