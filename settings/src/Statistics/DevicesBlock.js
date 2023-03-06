import {__} from '@wordpress/i18n';
import {
    useState,
    useEffect,
} from 'react';

import * as burst_api from '../utils/api';
import {getPercentage} from '../utils/formatting';
import Icon from '../utils/Icon';
import {useDevicesStats} from '../data/statistics/devices';
import ClickToFilter from './ClickToFilter';
import {useFilters} from '../data/statistics/filters';
import {useDate} from '../data/statistics/date';

const DevicesBlock = () => {
    const {loading, data, fetchDevicesData} = useDevicesStats();
    const {filters} = useFilters();
    const {startDate, endDate, range} = useDate();

    useEffect(() => {
        let args = {
            filters: filters,
        };
        fetchDevicesData(startDate, endDate, range, args);
    }, [startDate, endDate, range, filters]);

    let loadingClass = loading ? 'burst-loading' : '';
    return (
        <div className={'burst-loading-container ' + loadingClass}>
            {Object.keys(data).map((key, i) => {
                let m = data[key];
                return (
                    <ClickToFilter key={key} filter="device" filterValue={key} label={m.title}>
                        <div className="block__explanation-and-stats" key={i}>
                            <Icon name={key}/>
                            <div className="block__explanation-and-stats__left">
                                <h3 className="burst-h5">{m.title}</h3>
                                <p>{m.subtitle}</p>
                            </div>
                            <div className="block__explanation-and-stats__right">
                                <span className="burst-h4">{m.value}</span>
                                <p className={'uplift ' + m.changeStatus}>
                                    {m.change}
                                </p>
                            </div>
                        </div>
                    </ClickToFilter>
                );
            })}
        </div>
    );
};

export default DevicesBlock;