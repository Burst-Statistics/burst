import create from 'zustand';
import {endOfDay, format, startOfDay} from 'date-fns';
import * as burst_api from '../../utils/api';
import {__} from '@wordpress/i18n';

const startDate = format(startOfDay(new Date()), 'yyyy-MM-dd');
const endDate = format(endOfDay(new Date()), 'yyyy-MM-dd');
const defaultData = {
  live: {
    title: __('Live', 'burst-statistics'),
    value: '-',
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
export const UseTodayStats = create(set => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  liveVisitors: 0,
  todayData: defaultData,
  fetchLiveVisitors: () => {
    burst_api.getData('live-visitors', startDate, endDate, 'custom').then((response) => {
      console.log(response);
      set({liveVisitors: response});
    });
  }
}));

