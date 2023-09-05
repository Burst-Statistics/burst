import {create} from 'zustand';

// define the store
export const useInsightsStore = create((set, get) => ({
  metrics: ['visitors', 'pageviews'],
  setMetrics: (metrics) => set(() => ({ metrics: metrics })),
}));