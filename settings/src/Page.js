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
import {useDate} from './data/statistics/date';
import {useInsightsStats} from './data/statistics/insights';
import {useCompareStats} from './data/statistics/compare';
import {useDevicesStats} from './data/statistics/devices';
import {usePagesStats} from './data/statistics/pages';
import {useReferrersStats} from './data/statistics/referrers';
import {useFilters} from './data/statistics/filters';
import {useMenu} from './data/menu';
import {useFields} from './data/settings/fields';
import {useGoals} from './data/settings/goals';

const Page = () => {
  const {startDate, endDate, range} = useDate();
  const {fetchChartData, interval, insightsMetrics} = useInsightsStats();
  const {fetchCompareData} = useCompareStats();
  const {fetchDevicesData} = useDevicesStats();
  const {fetchPagesData, pagesMetrics} = usePagesStats();
  const {fetchReferrersData, referrersMetrics} = useReferrersStats();
  const {filters} = useFilters();



  const {fetchSubMenuData, selectedMainMenuItem, menuLoaded} = useMenu();
  const {
    fields,
    changedFields,
    fetchFieldsData,
    updateFieldsData,
    fieldsLoaded,
  } = useFields();
  const {fetchGoalFields, fetchGoalValues} = useGoals();


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
    await fetchFieldsData(subMenuItem);
  }, []);

  // get goals fields & values
  useEffect(async () => {
    await fetchGoalFields();
    await fetchGoalValues();
  }, []);

  // get data for stats & stuff
  useEffect(() => {
    let args = {
      filters: filters
    };
    fetchCompareData(startDate, endDate, range, args);
    fetchDevicesData(startDate, endDate, range, args);
  }, [startDate, endDate, range, filters]);

  useEffect(() => {
    let args = {
      filters: filters,
      metrics: insightsMetrics,
      interval: interval,
    };
    fetchChartData(startDate, endDate, range, args);
  }, [startDate, endDate, range, interval, insightsMetrics, filters]);

  useEffect(() => {
    let args = {
      filters: filters,
      metrics: pagesMetrics,
    };
    fetchPagesData(startDate, endDate, range, args);
  }, [startDate, endDate, range, pagesMetrics, filters]);

  useEffect(() => {
    let args = {
      filters: filters,
      metrics: referrersMetrics,
    };
    fetchReferrersData(startDate, endDate, range, args);
  }, [startDate, endDate, range, referrersMetrics, filters]);

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