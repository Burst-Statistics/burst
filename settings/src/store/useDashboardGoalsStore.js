import {create} from 'zustand';
import {endOfDay, format, startOfDay} from 'date-fns';
import * as burst_api from '../utils/api';
import {__} from '@wordpress/i18n';
import {
  formatNumber,
  getChangePercentage,
  formatPercentage,
} from '../utils/formatting';
import {getPercentage} from '../utils/formatting';
import {transformCompareData} from './useCompareStore';

const startDate = format(startOfDay(new Date()), 'yyyy-MM-dd');
const endDate = format(endOfDay(new Date()), 'yyyy-MM-dd');
const defaultData = {
  today: {
    title: __('Today', 'burst-statistics'),
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
  pageviews: {
    title: '-',
    value: '-',
  },
  conversionPercentage: {
    title: '-',
    value: '-',
  },
  bestDevice: {
    title: '-',
    value: '-',
    icon: 'desktop',
  },
  dateCreated: 0,
  dateStart: 0,
  dateEnd: 0,
  status: 'inactive',
};
// define the store
export const useDashboardGoalsStore = create(set => ({
  goalId: false,
  setGoalId: (goal) => set({goalId: goal}),
  data: defaultData,
  setData: (value) => set({data: value}),
  updateData: 1,
  incrementUpdateData: () => set(state => ({updateData: state.updateData + 1})),
  live: '-',
  setLive: (value) => set({live: value}),
  updateLive: 1,
  incrementUpdateLive: () => set(state => ({updateLive: state.updateLive + 1})),
  loading: true,
  setLoading: (value) => set({loading: value}),
}));

export const transformTotalGoalsData = (response) => {
  response.conversionPercentage.value = getPercentage(
      response.total.value, response.pageviews.value);
  response.bestDevice.value = formatPercentage(response.bestDevice.value);
  for (let key in response) {
    if (response.hasOwnProperty(key)) {
      if (key !== 'conversionPercentage' && key !== 'bestDevice') {
        if (typeof response[key] === 'object') {
          // if .value exists, format it
          if (response[key].value) {
            response[key].value = formatNumber(response[key].value);
          }
        }
      }
    }
  }
  // explain how it is calculated
  response.conversionPercentage.tooltip = __('Calculated by:',
          'burst-statistics') + ' ' +
      __('Total amount of goals reached ', 'burst-statistics') + ' / ' +
      __('Total amount of pageviews', 'burst-statistics') + ' (' +
      response.total.value + ' / ' + response.pageviews.value + ')';
  return response;
};

