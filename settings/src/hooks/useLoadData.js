import { useState, useEffect } from 'react';
import { useDate } from '../store/useDateStore';
import { useFiltersStore } from '../store/useFiltersStore';
import * as burst_api from '../utils/api';

export const useLoadData = (config) => {
  const { startDate, endDate, range } = useDate();
  const { filters } = useFiltersStore();
  const [error, setError] = useState(null);
  // merge dependencies from config with default dependencies
  let dependencies = config.dependencies || [];


  useEffect(() => {
    const loadData = async () => {
      try {
        config.setLoading(true);

        let args = config.args || {};
        const filteredFilters = Object.entries(filters)
        .filter(([key, value]) => value !== '' && value !== null)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
        args = { ...args, filters: {...filteredFilters} };

        // if startDate in args use that as selectedStartDate and remove from args
        let selectedStartDate = startDate;
        let selectedEndDate = endDate;
        if (args.startDate) {
          selectedStartDate = args.startDate;
          delete args.startDate;
        }
        if (args.endDate) {
          selectedEndDate = args.endDate;
          delete args.endDate;
        }

        const response = await burst_api.getData(
            config.type,
            selectedStartDate,
            selectedEndDate,
            range,
            args
        );
        const transformedData = config.transformData(response);
        config.setLoading(false);
        config.setData(transformedData);
      } catch (error) {
        setError(error);
      }
    };

    loadData();
  }, dependencies);

  return { error };
};
