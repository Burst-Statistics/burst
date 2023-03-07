import create from 'zustand';
import {__} from '@wordpress/i18n';
import * as burst_api from '../../utils/api';
import {
  formatNumber, formatTime,
  getBouncePercentage,
  getChangePercentage, getPercentage,
} from '../../utils/formatting';

const metrics = {
  'pageviews': __('Pageviews', 'burst-statistics'),
  'sessions': __('Sessions', 'burst-statistics'),
  'visitors': __('Visitors', 'burst-statistics'),
  'bounced_sessions': __('Bounce Rate', 'burst-statistics'),
};
let emptyData = {};
// loop through metrics and set default values
Object.keys(metrics).forEach(function (key) {
  emptyData[key] = {
    'title': metrics[key],
    'subtitle': '-',
    'value': '-',
    'change': '-',
    'changeStatus': '',
  };
})

// define the store
export const useCompareStats = create((set) => ({
  loading: true,
  setLoading: (loading) => set({loading}),
  data: emptyData,
  fetchCompareData: async (startDate, endDate, range, filters) => {
    set((state) => ({loading: true}));
    return burst_api.getData('compare', startDate, endDate, range, filters).then((response) => {
      // loop through object metrics and place and edit data to be ready for display
      let data = {};
      let curr = response.current;
      let prev = response.previous;
      for (const [key, value] of Object.entries(metrics)) {
        let change = getChangePercentage(curr[key], prev[key]);
        Object.assign(data, {
          [key]: {
            'title': value,
            'subtitle': '',
            'value': formatNumber(curr[key], 1),
            'change': change.val,
            'changeStatus': change.status,
          }
        });
        // Bounce rate is a bit different
        if (key === 'bounced_sessions') {
          // get unformatted percentage and calculate uplift
          let bouncePercentage = getBouncePercentage(curr[key], curr['sessions'], false);
          let bouncePercentagePrev = getBouncePercentage(prev[key], prev['sessions'], false);
          change = getChangePercentage(bouncePercentage, bouncePercentagePrev);

          data[key].value = getBouncePercentage(curr[key], curr['sessions']);
          data[key].change = change.val;
          data[key].changeStatus = change.status ;
          // flip change status
          if (data[key].changeStatus === 'positive') {
            data[key].changeStatus = 'negative';
          } else {
            data[key].changeStatus = 'positive';
          }

          data[key].subtitle =  curr.bounced_sessions + ' ' + __('visitors bounced', 'burst-statistics');
          data[key].value = getBouncePercentage(curr.bounced_sessions, curr.sessions);
        }
      }

      // Add subtitles and change metrics
      let pageviewsPerSession = curr.pageviews / curr.sessions;
      let timePerSession = pageviewsPerSession * curr.avg_time_on_page;
      data.pageviews.subtitle = formatNumber(pageviewsPerSession) + ' ' + __('pageviews per session', 'burst-statistics');
      data.sessions.subtitle = formatTime(timePerSession) + ' ' + __('per session', 'burst-statistics');
      data.visitors.subtitle = getPercentage(curr.first_time_visitors, curr.visitors) + ' ' + __('are new visitors', 'burst-statistics');

      set((state) => ({loading: false, data: data}));
    }).catch((error) => {
      console.error(error);
    });
  }
}));