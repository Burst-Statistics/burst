import create from 'zustand';
import {__} from '@wordpress/i18n';
import * as burst_api from '../../utils/api';
import {
  formatNumber, formatTime,
  getBouncePercentage,
  getChangePercentage, getPercentage,
} from '../../utils/formatting';

const deviceNames = {
  'desktop': __('Desktop', 'burst-statistics'),
  'tablet': __('Tablet', 'burst-statistics'),
  'mobile': __('Mobile', 'burst-statistics'),
  'other': __('Other', 'burst-statistics'),
};
let emptyData = {};
// loop through metrics and set default values
Object.keys(deviceNames).forEach(function(key) {
  emptyData[key] = {
    'title': deviceNames[key],
    'subtitle': '-',
    'value': '-%',
  };
});

// define the store
export const useDevicesStats = create((set) => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  data: emptyData,
  fetchDevicesData: async (startDate, endDate, range, filters) => {
    set((state) => ({loading: true}));
    return burst_api.getData('devices', startDate, endDate, range, filters).then((response) => {
      // loop through object metrics and place and edit data to be ready for display
      // loop through object deviceNames and place and edit data to be
      // ready for display
      let data = {};
      for (const [key, value] of Object.entries(deviceNames)) {
        let os = response[key].os ? response[key].os : '-';
        let browser = response[key].browser ? response[key].browser : 'unknown';

        Object.assign(data, {
          [key]: {
            'title': value,
            'subtitle': os + ' / ' + browser,
            'value': getPercentage(response[key].count, response['all'].count),
          },
        });
      }

      set((state) => ({loading: false, data: data}));
    }).catch((error) => {
      console.error(error);
    });
  }
}));