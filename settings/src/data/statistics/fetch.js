import {UseDate} from './date';
import {UseInsightsStats} from './insights';
import {UseCompareStats} from './compare';

export function fetchStatisticsData() {
  const {startDate, endDate, range} = UseDate();
  const {interval, metrics, fetchChartData} = UseInsightsStats();
  const {fetchCompareData} = UseCompareStats();

  fetchChartData(startDate, endDate, range, interval, metrics);
  fetchCompareData(startDate, endDate, range);
}