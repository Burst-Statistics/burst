import create from 'zustand';
import {__} from '@wordpress/i18n';
import {UseDate} from './date';
import * as burst_api from '../../utils/api';

const emptyChartData = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: __('Unique visitors', 'burst-statistics'),
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: 'rgba(41, 182, 246, 1)',
      backgroundColor: 'rgba(41, 182, 246, 0.2)',
    },
    {
      label: __('Pageviews', 'burst-statistics'),
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: 'rgba(244, 191, 62, 1)',
      backgroundColor: 'rgba(244, 191, 62, 0.2)',
    },
  ],
};

// define the store
export const UseInsightsStats = create((set) => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  insightsMetrics: ['visitors', 'pageviews'],
  setInsightsMetrics: (metrics) => set({metrics}),
  interval: 'day',
  setInterval: (interval) => set({interval}),
  chartData: emptyChartData,
  fetchChartData: (startDate, endDate, range, filters) => {
    console.log('fetchChartData');
    console.log(filters);
    set((state) => ({loading: true}));
    return burst_api.getData('insights', startDate, endDate, range, filters).then((response) => {
      set((state) => ({chartData: response}));
      set((state) => ({loading: false}));
    });
  },
}));