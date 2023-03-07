import create from 'zustand';
import {endOfDay, format, startOfDay} from 'date-fns';
import * as burst_api from '../../utils/api';
import {__} from '@wordpress/i18n';
import {formatTime, formatNumber, getChangePercentage} from '../../utils/formatting';

const startDate = format(startOfDay(new Date()), 'yyyy-MM-dd');
const endDate = format(endOfDay(new Date()), 'yyyy-MM-dd');
const defaultData = {
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
}
// define the store
export const useTodayStats = create(set => ({
  liveVisitors: '-',
  todayData: defaultData,
  fetchLiveVisitors: () => {
    return burst_api.getData('live-visitors', startDate, endDate, 'custom').then((response) => {
      set({liveVisitors: formatNumber(response)});
    });
  },
  fetchTodayData: () => {
    return burst_api.getData('today', startDate, endDate, 'custom').then((response) => {
      // loop trough response and format values
      for (let key in response) {
        if (response.hasOwnProperty(key)) {
          if (key === 'timeOnPage') {
            response[key].value = formatTime(response[key].value);
          }
          else {
            response[key].value = formatNumber(response[key].value);
          }
        }
      }
      set({todayData: response});
    });
  }
}));

