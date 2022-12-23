import PagePlaceholder from './Placeholder/PagePlaceholder';
import {useEffect, useState} from 'react';
import * as burst_api from './utils/api';
import Header from './Header';
import getAnchor from './utils/getAnchor';
import Tour from './Tour';
import DashboardPage from './Dashboard/DashboardPage';
import StatisticsPage from './Statistics/StatisticsPage';
import SettingsPage from './Settings/SettingsPage';
import {useMenu} from './data/menu';
import {UseDate} from './data/statistics/date';
import {UseInsightsStats} from './data/statistics/insights';
import {UseCompareStats} from './data/statistics/compare';
import {UseDevicesStats} from './data/statistics/devices';
import {UsePagesStats} from './data/statistics/pages';
import {UseReferrersStats} from './data/statistics/referrers';
import {UseTodayStats} from './data/dashboard/today';
import {UseFilter} from './data/statistics/filters';


const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const {selectedMainMenuItem, fetchMenu} = useMenu();
  const {startDate, endDate, range} = UseDate();
  const {fetchChartData, interval, insightsMetrics } = UseInsightsStats();
  const {fetchCompareData} = UseCompareStats();
  const {fetchDevicesData} = UseDevicesStats();
  const {fetchPagesData, pagesMetrics} = UsePagesStats();
  const {fetchReferrersData, referrersMetrics} = UseReferrersStats();
  const {fetchLiveVisitors} = UseTodayStats();
  const {pageId} = UseFilter();
  // const [fields, setFields] = useState([]);

  // only run on startup, wait for menu's to be loaded before rendering anything
  useEffect(async () => {
    // fetch global data first
    await fetchMenu();

    setIsLoaded(true);
  }, []);

  useEffect( () => {
    fetchLiveVisitors();
  }, []);

  useEffect( () => {
    let filters = {
      pageId: pageId,
    }
    fetchCompareData(startDate, endDate, range, filters);
    fetchDevicesData(startDate, endDate, range, filters);
  }, [startDate, endDate, range, pageId]);

  useEffect(() => {
    let filters = {
      pageId: pageId,
      metrics: insightsMetrics,
      interval: interval,
    }
    fetchChartData(startDate, endDate, range, filters);
  }, [startDate, endDate, range, interval, insightsMetrics, pageId]);

  useEffect(() => {
    let filters = {
      pageId: pageId,
      metrics: pagesMetrics,
    }
    fetchPagesData(startDate, endDate, range, filters);
  }, [startDate, endDate, range, pagesMetrics, pageId]);

  useEffect(() => {
    let filters = {
      pageId: pageId,
      metrics: referrersMetrics,
    }
    fetchReferrersData(startDate, endDate, range, filters);
  }, [startDate, endDate, range, referrersMetrics, pageId]);
  return (
      <>
        { !isLoaded && <PagePlaceholder />}
        { isLoaded && (
            <>
              <Header />
              <div className={'burst-content-area burst-grid burst-' + selectedMainMenuItem}>
                {(!burst_settings.tour_shown ||
                    (getAnchor() === 'dashboard' && getAnchor('menu') ===
                        'tour')) && <Tour/>}
                {selectedMainMenuItem === 'dashboard' && <DashboardPage /> }
                {selectedMainMenuItem === 'statistics' && <StatisticsPage />}
                {selectedMainMenuItem === 'settings' && <SettingsPage />}
              </div>
            </>
        )}
      </>
  )
};

export default Page;