import {create} from 'zustand';
import {endOfDay, format, startOfDay} from 'date-fns';
import * as burst_api from '../utils/api';
import {__} from '@wordpress/i18n';
import {
  formatTime,
  formatNumber,
  getChangePercentage,
} from '../utils/formatting';

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
};
// define the store
export const useTodayStore = create(set => ({
  live: '-',
  setLive: (value) => set({live: value}),
  updateLive: 1,
  incrementUpdateLive: () => set(state => ({updateLive: state.updateLive + 1})),
  data: defaultData,
  setData: (value) => set({data: value}),
  updateData: 1,
  incrementUpdateData: () => set(state => ({updateData: state.updateData + 1})),

  loading: true,
  setLoading: (value) => set({loading: value}),
}));

export const transformTodayData = (response) => {

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
  return response;
};

