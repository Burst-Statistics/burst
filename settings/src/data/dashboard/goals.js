import create from 'zustand';
import {endOfDay, format, startOfDay} from 'date-fns';
import * as burst_api from '../../utils/api';
import {__} from '@wordpress/i18n';

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
  visitors: {
    title: '-',
    value: '-',
  },
  conversionPercentage: {
    title: '-',
    value: '-',
  },
  timeToGoal: {
    title: '-',
    value: '-',
  },
  dateStart: '-',
}
// define the store
export const useGoalsStats = create(set => ({
  todayGoals: '-',
  totalGoalsData: defaultData,
  fetchTodayGoals: () => {
    burst_api.getData('live-goals', startDate, endDate, 'custom').then((response) => {
      set({todayGoals: response});
    });
  },
  fetchTotalGoalsData: () => {
    burst_api.getData('goals', startDate, endDate, 'custom').then((response) => {
      set({totalGoalsData: response});
    });
  }
}));

