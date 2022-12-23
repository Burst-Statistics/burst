import create from 'zustand';
import * as burst_api from '../../utils/api';

// define the store
export const UseReferrersStats = create((set) => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  referrersMetrics: ['pageviews'],
  data: [],
  fetchReferrersData: async (startDate, endDate, range, metrics) => {
    set((state) => ({loading: true}));
    burst_api.getData('referrers', startDate, endDate, range, metrics).then((response) => {
      response.columns[0].selector = row => row.referrer; // select data for referrer column
      response.columns[1].selector = row => row.count; // select data for count column
      // foreach data convert to int
      response.data.forEach((row, index) => {
        row.count = parseInt(row.count);
      });

      set((state) => ({loading: false, data: response}));
    }).catch((error) => {
      console.error(error);
    });
  }
}));