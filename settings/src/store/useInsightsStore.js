import {create} from 'zustand';

// define the store
export const useInsightsStore = create((set, get) => ({
  metrics: ['visitors', 'pageviews'],
  loaded:false,
  getMetrics: () => {
    if (get().loaded) {
      return get().metrics;
    }
    let metrics = [];
    if (typeof Storage !== "undefined") {
      // Store the updated metricsData object in sessionStorage
      metrics = sessionStorage.getItem('burst_metrics');
      if (metrics && metrics.length>0 ) {
        metrics = JSON.parse(metrics);
      } else {
        metrics = [];
      }
    }
    if (metrics.length===0) {
      metrics = ['visitors', 'pageviews'];
    }
    set(() => ({metrics: metrics, loaded:true}));
    return metrics;
  },
  setMetrics: (metrics) => {
    set(() => ({metrics: metrics}))
    if (typeof Storage !== "undefined") {
      // Store the updated metricsData object in sessionStorage
      sessionStorage.setItem('burst_metrics', JSON.stringify(metrics));
    }
  },
}));