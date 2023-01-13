import create from 'zustand';
import * as burst_api from '../../utils/api';
import {ClickableRowItem} from '../../Statistics/ClickableRowItem';


// define the store
export const usePagesStats = create((set) => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  pagesMetrics: ['pageviews'],
  data: [],
  fetchPagesData: (startDate, endDate, range, filters) => {
    set((state) => ({loading: true}));
    burst_api.getData('pages', startDate, endDate, range, filters).
        then((response) => {
          response.columns[0].selector = row => row.page; // select data for page column
          const metrics = response.metrics
          response.columns.forEach((column, index) => {
            if (index > 0) {
              column.selector = row => row[metrics[index - 1]];
            }
          });

          // foreach data convert to int
          response.data.forEach((row, index) => {
            response.metrics.forEach((metric, index) => {
              row[metric] = parseInt(row[metric]);
            });
          });

          set((state) => ({loading: false, data: response}));
        });
  },
}));