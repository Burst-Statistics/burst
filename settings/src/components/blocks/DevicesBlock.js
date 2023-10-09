import {__} from '@wordpress/i18n';
import {useState, useEffect, useRef} from 'react';
import * as burst_api from '../../utils/api';
import {getPercentage} from '../../utils/formatting';
import Icon from '../../utils/Icon';
import ClickToFilter from './ClickToFilter';
import {useFiltersStore} from '../../store/useFiltersStore';
import {useDate} from '../../store/useDateStore';
import GridItem from '../common/GridItem';
import ExplanationAndStatsItem from '../common/ExplanationAndStatsItem';
import {useQuery} from '@tanstack/react-query';
import getDevicesData from '../../api/getDevicesData';

const DevicesBlock = () => {
  const {startDate, endDate, range} = useDate( (state) => state);
  const filters = useFiltersStore((state) => state.filters);
  const args = { 'filters': filters};

  const deviceNames = {
    'desktop': __('Desktop', 'burst-statistics'),
    'tablet': __('Tablet', 'burst-statistics'),
    'mobile': __('Mobile', 'burst-statistics'),
    'other': __('Other', 'burst-statistics'),
  };
  let emptyData = {};
// loop through metrics and set default values
  Object.keys(deviceNames).forEach(function(key) {
    emptyData[key] = {
      'title': deviceNames[key],
      'subtitle': '-',
      'value': '-%',
    };
  });

  const query = useQuery({
    queryKey: ['devices', startDate, endDate, args],
    queryFn: () => getDevicesData({startDate, endDate, range, args}),
    placeholderData: emptyData,
  });

  const data = query.data || {};
  const loading = query.isLoading || query.isFetching;
  let loadingClass = loading ? 'burst-loading' : '';

  return (
      <GridItem
          title={__('Devices', 'burst-statistics')}
      >
        <div className={'burst-loading-container ' + loadingClass}>
          {Object.keys(data).map((key, i) => {
            let m = data[key];
            return (
                <ClickToFilter key={key} filter="device" filterValue={key}
                               label={m.title}>
                  <ExplanationAndStatsItem
                      iconKey={key}
                      title={m.title}
                      subtitle={m.subtitle}
                      value={m.value}
                      change={m.change}
                      changeStatus={m.changeStatus}
                  />
                </ClickToFilter>
            );
          })}
        </div>
      </GridItem>
  );
};

export default DevicesBlock;
