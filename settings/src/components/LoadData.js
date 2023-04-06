import {useMemo} from 'react';
import {
  transformCompareData,
  useCompareStore,
} from '../store/useCompareStore';
import {
  transformDevicesData,
  useDevicesStore,
} from '../store/useDevicesStore';
import {transformPagesData, usePagesStore} from '../store/usePagesStore';
import {transformReferrersData, useReferrersStore} from '../store/useReferrersStore';
import {useLoadData} from '../hooks/useLoadData';
import {useFiltersStore} from '../store/useFiltersStore';
import {useInsightsStore} from '../store/useInsightsStore';
import {useTodayStore, transformTodayData} from '../store/useTodayStore';
import {
  useGoalsStore,
  transformTotalGoalsData,
} from '../store/useDashboardGoalsStore';
import {endOfDay, format, startOfDay} from 'date-fns';
import {formatNumber} from '../utils/formatting';
import {useDate} from '../store/useDateStore';

export const LoadData = () => {
  const { filters } = useFiltersStore();
  const { startDate, endDate, range } = useDate();

  const {
    setData: setTodayData,
    setLoading: setTodayLoading,
    setLive,
    updateLive: updateLiveToday,
    updateData: updateDataToday,
  } = useTodayStore();

  // dashnoard imports
  const {
    setData: setGoals,
    setLoading: setGoalsLoading,
    setLive: setLiveGoals,
    goalId,
    updateData: updateDataGoals,
    updateLive: updateLiveGoals,
  } = useGoalsStore();

  // statistics imports
  const { setData: setInsightsData, setLoading: setInsightsLoading, metrics: insightMetrics } = useInsightsStore();
  const { setData: setCompareData, setLoading: setCompareLoading } = useCompareStore();
  const { setData: setDevicesData, setLoading: setDevicesLoading } = useDevicesStore();
  const { setData: setPagesData, setLoading: setPagesLoading, metrics: pagesMetrics } = usePagesStore();
  const { setData: setReferrersData, setLoading: setReferrersLoading, metrics: referrersMetrics } = useReferrersStore();

  // get currentDate
  const currentDate = new Date();

  // get client's timezone offset in minutes
  const clientTimezoneOffsetMinutes = currentDate.getTimezoneOffset();

  // convert client's timezone offset from minutes to seconds
  const clientTimezoneOffsetSeconds = clientTimezoneOffsetMinutes * -60;

  // get current unix timestamp
  const currentUnix = Math.floor(currentDate.getTime() / 1000);
  // add burst_settings.gmt_offset x hour and client's timezone offset in
  // seconds to currentUnix
  const currentUnixWithOffsets = currentUnix +
      (burst_settings.gmt_offset * 3600) - clientTimezoneOffsetSeconds;

  // get current date by currentUnixWithOffsets
  const currentDateWithOffset = new Date(currentUnixWithOffsets * 1000);

  const TodayStartDate = format(startOfDay(currentDateWithOffset), 'yyyy-MM-dd');
  const TodayEndDate = format(endOfDay(currentDateWithOffset), 'yyyy-MM-dd');

  const DashboardFetchConfigs = useMemo(() => [
    {
      type: 'goals',
      transformData: transformTotalGoalsData,
      setData: setGoals,
      setLoading: setGoalsLoading,
      args: {
        goal_id: goalId,
        startDate: format(startOfDay(new Date()), 'yyyy-MM-dd'), // @todo change to startdate of goal
        endDate: format(endOfDay(new Date()), 'yyyy-MM-dd'),
      },
      dependencies: [goalId, updateDataGoals],
    },
    {
      type: 'live-goals',
      transformData: formatNumber,
      setData: setLiveGoals,
      setLoading: () => {},
      args: {
        goal_id: goalId,
        startDate: TodayStartDate,
        endDate: TodayEndDate,
      },
      dependencies: [goalId, updateLiveGoals],
    },
    {
      type: 'live-visitors',
      transformData: formatNumber,
      setData: setLive,
      setLoading: () => {},
      dependencies: [updateLiveToday]
    },
    {
      type: 'today',
      transformData: transformTodayData,
      setData: setTodayData,
      setLoading: setTodayLoading,
      args: {
        startDate: TodayStartDate,
        endDate: TodayEndDate,
      },
      dependencies: [updateDataToday],
    }
  ]);
  const statDependencies = [filters, startDate, endDate, range];
  const StatisticsFetchConfigs = useMemo(() => [
    {
      type: 'insights',
      transformData: (data) => {return data},
      setData: setInsightsData,
      setLoading: setInsightsLoading,
      args: { metrics: insightMetrics },
      dependencies: [...insightMetrics, ...statDependencies],
    },
    {
      type: 'compare',
      transformData: transformCompareData,
      setData: setCompareData,
      setLoading: setCompareLoading,
      dependencies: statDependencies,
    },
    {
      type: 'devices',
      transformData: transformDevicesData,
      setData: setDevicesData,
      setLoading: setDevicesLoading,
      dependencies: statDependencies,
    },
    {
      type: 'pages',
      transformData: transformPagesData,
      setData: setPagesData,
      setLoading: setPagesLoading,
      args: {
        metrics: pagesMetrics,
      },
      dependencies: [pagesMetrics, ...statDependencies],
    },
    {
      type: 'referrers',
      transformData: transformReferrersData,
      setData: setReferrersData,
      setLoading: setReferrersLoading,
      args: {
        metrics: referrersMetrics,
      },
      dependencies: [referrersMetrics, ...statDependencies],
    },
  ]);

  StatisticsFetchConfigs.forEach((config) => {
    useLoadData(config);
  });

  DashboardFetchConfigs.forEach((config) => {
    useLoadData(config);
  });


  return (
      <></>
  );
};