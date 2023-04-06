import {create} from 'zustand';
import * as burst_api from '../utils/api';
import {ClickableRowItem} from '../components/blocks/ClickableRowItem';
import {__} from '@wordpress/i18n';


// define the store
export const usePagesStore = create((set) => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  metrics: ['page_url', 'pageviews'],
  data: [],
  setData: (data) => set({data}),
}));

export const transformPagesData = (response) => {
  const metrics = response.metrics;

  // Update columns
  response.columns = response.columns.map((column, index) => {
    const name = column.name.toLowerCase();
    if (index > 0) {
      return {
        ...column,
        selector: (row) => row[name],
        id: name, // Add id to the column
      };
    } else {
      return {
        ...column,
        id: name,
      };
    }
  });

  // Convert metric values to integers
  response.data.forEach((row, index) => {
    for (let key in metrics) {
      response.data[index][metrics[key]] = parseInt(row[metrics[key]]);
    }
  });

  if (metrics[1] === 'conversions') {
    response.columns[1].name = __('Conversions', 'burst-statistics');
  }

  return response;
};
