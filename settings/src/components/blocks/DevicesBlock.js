import {__} from '@wordpress/i18n';
import {useState, useEffect, useRef} from 'react';
import * as burst_api from '../../utils/api';
import {getPercentage} from '../../utils/formatting';
import Icon from '../../utils/Icon';
import {useDevicesStore} from '../../store/useDevicesStore';
import ClickToFilter from './ClickToFilter';
import {useFiltersStore} from '../../store/useFiltersStore';
import {useDate} from '../../store/useDateStore';
import GridItem from '../common/GridItem';
import ExplanationAndStatsItem from '../common/ExplanationAndStatsItem';
import {fetchDevicesData} from '../../store/useDevicesStore';

const DevicesBlock = () => {
  const loading = useDevicesStore((state) => state.loading);
  const data = useDevicesStore((state) => state.data);

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
