import {__} from '@wordpress/i18n';
import {
  formatTime,
  formatNumber, getRelativeTime,
} from '../../utils/formatting';
import Tooltip from '@mui/material/Tooltip';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import getLiveVisitors from '../../api/getLiveVisitors';
import getTodayData from '../../api/getTodayData';

import Icon from '../../utils/Icon';
import {endOfDay, format, intervalToDuration, startOfDay} from 'date-fns';
import {useRef, useState} from 'react';
import GridItem from '../common/GridItem';
import {getDateWithOffset} from "../../utils/formatting";

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

const TodayBlock = () => {
  const [interval, setInterval] = useState(5000);
  const currentDateWithOffset = getDateWithOffset();
  const startDate = format(startOfDay(currentDateWithOffset), 'yyyy-MM-dd');
  const endDate = format(endOfDay(currentDateWithOffset), 'yyyy-MM-dd');
  const placeholderData = {
    live: {
      title: __('Live', 'burst-statistics'),
      icon: 'visitor',
    },
    today: {
      title: __('Total', 'burst-statistics'),
      value: '-',
      icon: 'visitor',
    },
    mostViewed: {
      title: '-',
      value: '-',
    },
    pageviews: {
      title: '-',
      value: '-',
    },
    referrer: {
      title: '-',
      value: '-',
    },
    timeOnPage: {
      title: '-',
      value: '-',
    },
  };
  const queries = useQueries({
        queries: [
          {
            queryKey: ['live-visitors'],
            queryFn: getLiveVisitors,
            refetchInterval: interval,
            placeholderData: '-',
            onError: (error) => {
              setInterval(0);
            }
          },
          {
            queryKey: ['today'],
            queryFn: () => getTodayData({startDate, endDate}),
            refetchInterval: interval * 2,
            placeholderData: placeholderData,
            onError: (error) => {
              setInterval(0);
            }
          }
        ]
      }
  );



  // Your existing code
  const live = queries[0].data;
  let data = queries[1].data;
  if (queries.some((query) => query.isError)) {
    data = placeholderData;
  }
  let liveIcon = selectVisitorIcon(live ? live : 0);
  let todayIcon = 'loading';
  if (data && data.today) {
    todayIcon = selectVisitorIcon(data.today.value ? data.today.value : 0);
  }

  return (
      <GridItem
          className={'border-to-border burst-today'}
          title={__('Today', 'burst-statistics')}
          controls={<>{queries[0].isFetching ? <Icon name={"loading"} /> : null }</>}
      >
        <div className="burst-today">
          <div className="burst-today-select">
            <Tooltip arrow title={data.live.tooltip} enterDelay={200}>
              <div className="burst-today-select-item">
                <Icon name={liveIcon} size="23"/>
                <h2>{live}</h2>
                <span><Icon name="live" size="12" color={'red'}/> {__('Live', 'burst-statistics')}</span>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.today.tooltip}
                     enterDelay={200}>
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
                     enterDelay={200}>
              <div className="burst-today-list-item">
                <Icon name="winner"/>
                <p className="burst-today-list-item-text">{decodeURI(data.mostViewed.title)}</p>
                <p className="burst-today-list-item-number">{data.mostViewed.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.referrer.tooltip}
                     enterDelay={200}>
              <div className="burst-today-list-item">
                <Icon name="referrer"/>
                <p className="burst-today-list-item-text">{decodeURI(data.referrer.title)}</p>
                <p className="burst-today-list-item-number">{data.referrer.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.pageviews.tooltip}
                     enterDelay={200}>
              <div className="burst-today-list-item">
                <Icon name="pageviews"/>
                <p className="burst-today-list-item-text">{data.pageviews.title}</p>
                <p className="burst-today-list-item-number">{data.pageviews.value}</p>
              </div>
            </Tooltip>
            <Tooltip arrow title={data.timeOnPage.tooltip}
                     enterDelay={200}>
              <div className="burst-today-list-item">
                <Icon name="time"/>
                <p className="burst-today-list-item-text">{data.timeOnPage.title}</p>
                <p className="burst-today-list-item-number">{data.timeOnPage.value}</p>
              </div>
            </Tooltip>
          </div>
        </div>
      </GridItem>
  );
};
export default TodayBlock;