import {__, _x} from '@wordpress/i18n';
import {useState, useEffect, useRef} from 'react';
import DataTable from 'react-data-table-component';
import EmptyDataTable from './EmptyDataTable';
import * as burst_api from '../../utils/api';
import {useReferrersStore} from '../../store/useReferrersStore';
import ClickToFilter from './ClickToFilter';
import {useFiltersStore} from '../../store/useFiltersStore';
import {useDate} from '../../store/useDateStore';
import GridItem from '../common/GridItem';

const ReferrersBlock = (props) => {
  const loading = useReferrersStore((state) => state.loading);
  const data = useReferrersStore((state) => state.data);

  let loadingClass = loading ? 'burst-loading' : '';

  if (data.length !== 0) {
    // make cell clickable
    data.columns[0].cell = (row) => {
      return (
          <ClickToFilter filter="referrer" filterValue={row.referrer}>
            {row.referrer}
          </ClickToFilter>
      );
    };
  }
  let tableData = data.data;
  let columns = data.columns;
  return (
      <GridItem
          className={'burst-column-2 border-to-border datatable'}
          title={__('Acquisition', 'burst-statistics')}
      >
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
      </GridItem>
  );

};

export default ReferrersBlock;

