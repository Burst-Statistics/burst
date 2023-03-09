import PagePlaceholder from './Placeholder/PagePlaceholder';
import {useEffect, useState} from 'react';
import Header from './Header';
import getAnchor from './utils/getAnchor';
import Tour from './Tour';
import DashboardPage from './Dashboard/DashboardPage';
import StatisticsPage from './Statistics/StatisticsPage';
import Menu from './Settings/Menu/Menu';
import Settings from './Settings/Settings';
import Notices from './Settings/Notices';

// import data
import {useMenu} from './data/menu';
import {useFields} from './data/settings/fields';
import {useGoals} from './data/settings/goals';
import {useGoalsStats} from './data/dashboard/goals';
import {useTodayStats} from './data/dashboard/today';
import {useInsightsStats} from './data/statistics/insights';
import {useFilters} from './data/statistics/filters';
import {useDate} from './data/statistics/date';
import {useCompareStats} from './data/statistics/compare';
import {useDevicesStats} from './data/statistics/devices';
import {usePagesStats} from './data/statistics/pages';
import {useReferrersStats} from './data/statistics/referrers';

const Page = () => {
  const fetchSubMenuData = useMenu((state) => state.fetchSubMenuData);
  const selectedMainMenuItem = useMenu((state) => state.selectedMainMenuItem);
  const menuLoaded = useMenu((state) => state.menuLoaded);
  const fields = useFields((state) => state.fields);
  const changedFields = useFields((state) => state.changedFields);
  const fetchFieldsData = useFields((state) => state.fetchFieldsData);
  const updateFieldsData = useFields((state) => state.updateFieldsData);
  const fieldsLoaded = useFields((state) => state.fieldsLoaded);
  const initGoals = useGoals((state) => state.initGoals);

  // dashboard stores
  const fetchLiveVisitors = useTodayStats((state) => state.fetchLiveVisitors);
  const fetchTodayData = useTodayStats((state) => state.fetchTodayData);
  const fetchTodayGoals = useGoalsStats((state) => state.fetchTodayGoals);
  const fetchTotalGoalsData = useGoalsStats(
      (state) => state.fetchTotalGoalsData);
  const selectedGoalId = useGoalsStats((state) => state.selectedGoalId);

  // statistics stores
  const filters = useFilters((state) => state.filters);
  const startDate = useDate((state) => state.startDate);
  const endDate = useDate((state) => state.endDate);
  const range = useDate((state) => state.range);
  const insightsMetrics = useInsightsStats(state => state.insightsMetrics);
  const fetchChartData = useInsightsStats(state => state.fetchChartData);
  const fetchCompareData = useCompareStats((state) => state.fetchCompareData);
  const fetchDevicesData = useDevicesStats((state) => state.fetchDevicesData);
  const fetchPagesData = usePagesStats((state) => state.fetchPagesData);
  const fetchReferrersData = useReferrersStats(
      (state) => state.fetchReferrersData);
  const pagesMetrics = usePagesStats(state => state.pagesMetrics);
  const referrersMetrics = useReferrersStats(state => state.referrersMetrics);

  // change pages
  useEffect(async () => {
    if (fieldsLoaded) {
      await fetchSubMenuData(fields);
    }
    window.addEventListener('hashchange', () => {
      fetchSubMenuData(fields);
    });
  }, [fields]);

  useEffect(async () => {
    let subMenuItem = getAnchor('menu');
    updateFieldsData(subMenuItem);
  }, [changedFields]);

  useEffect(async () => {
    let subMenuItem = getAnchor('menu');
    fetchFieldsData(subMenuItem);
    initGoals();

  // function to load data in the background after the main data has been loaded.
    const currentAnchor = getAnchor();
    const args = {
      filters: filters,
    }
    if (currentAnchor === 'statistics') {
      Promise.all([
        fetchChartData(startDate, endDate, range, {...args, metrics: insightsMetrics}),
        fetchCompareData(startDate, endDate, range, args),
        fetchDevicesData(startDate, endDate, range, args),
        fetchPagesData(startDate, endDate, range, {...args, metrics: pagesMetrics}),
        fetchReferrersData(startDate, endDate, range, {...args, metrics: referrersMetrics}),
      ]).then((results) => {
        fetchLiveVisitors();
        fetchTodayData();
        fetchTodayGoals(selectedGoalId);
        fetchTotalGoalsData(selectedGoalId);
      }).catch((error) => {
        console.error(error);
      });
    } else {
      Promise.all([
        fetchLiveVisitors(),
        fetchTodayData(),
        fetchTodayGoals(selectedGoalId),
        fetchTotalGoalsData(selectedGoalId),
      ]).then((results) => {
        fetchChartData(startDate, endDate, range, {...args, metrics: insightsMetrics});
        fetchCompareData(startDate, endDate, range, args);
        fetchDevicesData(startDate, endDate, range, args);
        fetchPagesData(startDate, endDate, range, {...args, metrics: pagesMetrics});
        fetchReferrersData(startDate, endDate, range, {...args, metrics: referrersMetrics});
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [])

  // without the temp var, it doesn't update in time
  let selectedMainMenu = getAnchor('main');
  return (
      <>
        <Header/>
        {menuLoaded && (<>
          <div className={'burst-content-area burst-grid burst-' +
              selectedMainMenuItem}>
            {(!burst_settings.tour_shown ||
                (getAnchor() === 'dashboard' && getAnchor('menu') ===
                    'tour')) && <Tour/>}
            {selectedMainMenuItem === 'dashboard' && <DashboardPage/>}
            {selectedMainMenuItem === 'statistics' && <StatisticsPage/>}
            {selectedMainMenuItem === 'settings' &&
                <>
                  <Menu/>
                  <Settings/>
                  <Notices className="cmplz-wizard-notices"/>
                </>
            }
          </div>
        </>)}
        {!menuLoaded && <PagePlaceholder/>}
      </>
  );
};

export default Page;