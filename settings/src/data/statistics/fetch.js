import {useDate} from './date';
import {useInsightsStats} from './insights';
import {useCompareStats} from './compare';

export function fetchStatisticsData() {
  const {startDate, endDate, range} = useDate();
  const {interval, metrics, fetchChartData} = useInsightsStats();
  const {fetchCompareData} = useCompareStats();

  fetchChartData(startDate, endDate, range, interval, metrics);
  fetchCompareData(startDate, endDate, range);
}