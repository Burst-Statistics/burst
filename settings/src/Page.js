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
  const {fetchSubMenuData, selectedMainMenuItem, menuLoaded} = useMenu();
  const {
    fields,
    changedFields,
    fetchFieldsData,
    updateFieldsData,
    fieldsLoaded,
  } = useFields();
  const {initGoals} = useGoals();

  // dashboard stores
  const {fetchLiveVisitors, fetchTodayData} = useTodayStats();
  const {selectedGoalId, fetchTodayGoals, fetchTotalGoalsData} = useGoalsStats();

  // statistics stores
  const {filters} = useFilters();
  const {startDate, endDate, range} = useDate();
  const { fetchChartData, insightsMetrics } = useInsightsStats(state => state);
  const { fetchCompareData }  = useCompareStats();
  const { fetchDevicesData } = useDevicesStats();
  const { fetchPagesData, pagesMetrics } = usePagesStats();
  const { fetchReferrersData, referrersMetrics } = useReferrersStats();


  const fetchDashboardData = async () => {
    // console log time start
    console.log('fetchDashboardData start', new Date().getTime());
    const [liveVisitorsData, todayData, todayGoalsData, totalGoalsData] = await Promise.all([
      fetchLiveVisitors(),
      fetchTodayData(),
      fetchTodayGoals(selectedGoalId),
      fetchTotalGoalsData(selectedGoalId),
    ]);
    console.log('fetchDashboardData end', new Date().getTime());
  }

  const fetchStatisticsData = async () => {
    // console log time start
    console.log('fetchStatisticsData start', new Date().getTime());
    let insightsArgs = {
      filters: filters,
      metrics: insightsMetrics,
    };
    let compareArgs = {
      filters: filters,
    };
    let devicesArgs = {
      filters: filters,
    };
    let pagesArgs = {
      filters: filters,
      metrics: pagesMetrics,
    };
    let referrerArgs = {
      filters: filters,
      metrics: referrersMetrics,
    }


    await fetchChartData(startDate, endDate, range, insightsArgs);
    await fetchCompareData(startDate, endDate, range, compareArgs);
    await fetchDevicesData(startDate, endDate, range, devicesArgs);
    await fetchPagesData(startDate, endDate, range, pagesArgs);
    await fetchReferrersData(startDate, endDate, range, referrerArgs);

    console.log('fetchStatisticsData end', new Date().getTime());
  }


  // change pages
  useEffect(async () => {
    console.log('fields useEffect');
    console.log('fieldsLoaded', fieldsLoaded)
    console.log('fields', fields)
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
    await fetchFieldsData(subMenuItem);
  }, []);

  // get goals fields & values
  useEffect(async () => {
    await initGoals();

  }, []);

  // function to load data in the background after the main data has been loaded.
  useEffect(async () => {
    const currentAnchor = getAnchor();
    if (currentAnchor === 'statistics') {
      try {
        await Promise.all([
          fetchStatisticsData()
        ]);
        setTimeout(() => {
          fetchDashboardData();
        }, 2000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      try {
        await Promise.all([
          fetchDashboardData()
        ]);
        setTimeout(() => {
          fetchStatisticsData();
        }, 2000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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