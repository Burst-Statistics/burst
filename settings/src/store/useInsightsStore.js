import {create} from 'zustand';

// define the store
export const useInsightsStore = create((set, get) => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  data: null,
  setData: (data) => set({data}),
  metrics: ['visitors', 'pageviews'],
  setMetrics: (metrics) => set(() => ({ metrics: metrics })),
}));