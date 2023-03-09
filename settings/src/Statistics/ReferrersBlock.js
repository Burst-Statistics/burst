import { __, _x } from '@wordpress/i18n';
import { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import EmptyDataTable from './EmptyDataTable';
import * as burst_api from '../utils/api';
import {useReferrersStats} from '../data/statistics/referrers';
import ClickToFilter from './ClickToFilter';
import {useFilters} from '../data/statistics/filters';
import {useDate} from '../data/statistics/date';

const ReferrersBlock = (props) => {
  const loading = useReferrersStats((state) => state.loading);
  const data = useReferrersStats((state) => state.data);
  const fetchReferrersData = useReferrersStats((state) => state.fetchReferrersData);
  const referrersMetrics = useReferrersStats((state) => state.referrersMetrics);

  let loadingClass = loading ? 'burst-loading' : '';
  const filters = useFilters((state) => state.filters);

  const startDate = useDate((state) => state.startDate);
  const endDate = useDate((state) => state.endDate);
  const range = useDate((state) => state.range);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    let args = {
      filters: filters,
      metrics: referrersMetrics,
    };
    fetchReferrersData(startDate, endDate, range, args);
  }, [startDate, endDate, range, referrersMetrics, filters]);

  // if data is empty array, then we need to show empty data table
  if (data.length === 0) {
    return (
        <div className={'burst-loading-container ' + loadingClass}>
          <EmptyDataTable/>;
        </div>
    );
  }

  // make cell clickable
  data.columns[0].cell = (row) => {
    return (
        <ClickToFilter filter="referrer" filterValue={row.referrer}>
          {row.referrer}
        </ClickToFilter>
    );
  };

  let tableData = data.data;
  let columns = data.columns

  return (
      <div className={'burst-loading-container ' + loadingClass}>
        <DataTable
            columns={columns}
            data={tableData}
            defaultSortFieldId={2}
            defaultSortAsc={false}
            pagination
            paginationRowsPerPageOptions={[10, 25, 50, 100, 200]}
            paginationPerPage={10}
            paginationComponentOptions={{
              rowsPerPageText: '',
              rangeSeparatorText: __('of', 'burst-statistics'),
              noRowsPerPage: false,
              selectAllRowsItem: true,
              selectAllRowsItemText: __('All', 'burst-statistics'),
            }}
            noDataComponent={<EmptyDataTable></EmptyDataTable>}
        />
      </div>
  );

};

export default ReferrersBlock;

