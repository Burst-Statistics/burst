import {create} from 'zustand';
import * as burst_api from '../utils/api';

// define the store
export const useReferrersStore = create((set) => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  referrersMetrics: ['referrers', 'pageviews'],
  data: [],
  setData: (data) => set({data}),
}));

export const transformReferrersData = (response) => {
  response.columns[0].selector = row => row.referrer; // select data for referrer column
  response.columns[1].selector = row => row.count; // select data for count column
  // foreach data convert to int
  response.data.forEach((row, index) => {
    row.count = parseInt(row.count);
  });

  return response;
}