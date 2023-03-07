import create from 'zustand';
import {endOfDay, format, startOfDay} from 'date-fns';
import * as burst_api from '../../utils/api';
import {__} from '@wordpress/i18n';
import {
  formatNumber,
  getChangePercentage,
  formatPercentage
} from '../../utils/formatting';
import {getPercentage} from '../../utils/formatting';

const startDate = format(startOfDay(new Date()), 'yyyy-MM-dd');
const endDate = format(endOfDay(new Date()), 'yyyy-MM-dd');
const defaultData = {
  today: {
    title: __('Today', 'burst-statistics'),
    icon: 'goals',
  },
  total: {
    title: __('Total', 'burst-statistics'),
    value: '-',
    icon: 'goals',
  },
  topPerformer: {
    title: '-',
    value: '-',
  },
  pageviews: {
    title: '-',
    value: '-',
  },
  conversionPercentage: {
    title: '-',
    value: '-',
  },
  bestDevice: {
    title: '-',
    value: '-',
    icon: 'desktop',
  },
  dateStart: '-',
}
// define the store
export const useGoalsStats = create(set => ({
  selectedGoalId: false,
  setSelectedGoalId: (goal) => set({selectedGoalId: goal}),
  todayGoals: '-',
  totalGoalsData: defaultData,
  fetchTodayGoals: (id, empty = true) => {
    // if (empty) {
    //   set((state) => ({todayGoals: '-'}));
    // }
    let args = {
      goal_id: id,
    }
    return burst_api.getData('live-goals', startDate, endDate, 'custom', args).then((response) => {
      set({todayGoals: formatNumber(response)});
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchTotalGoalsData: (id) => {
    // set({totalGoalsData: defaultData});
    let args = {
      goal_id: id,
    }
    return burst_api.getData('goals', startDate, endDate, 'custom', args).then((response) => {

      response.conversionPercentage.value = getPercentage(response.total.value, response.pageviews.value);
      response.bestDevice.value = formatPercentage(response.bestDevice.value);
      for (let key in response) {
        if (response.hasOwnProperty(key)) {
          if (key !== 'conversionPercentage' && key !== 'bestDevice') {
            // if .value exists, format it
            if (response[key].value) {
              response[key].value = formatNumber(response[key].value);
            }
            // explain how it is calculated
            response.conversionPercentage.tooltip = __('Calculated by:', 'burst-statistics') + ' ' + __('Total amount of goals', 'burst-statistics') + ' / ' + __('Total amount of pageviews', 'burst-statistics') + ' (' + response.total.value + ' / ' + response.pageviews.value + ')';
          }
        }
      }
      set({totalGoalsData: response});
    }).catch((error) => {
      console.error(error);
    });
  }
}));

