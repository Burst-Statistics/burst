import {__} from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import EmptyDataTable from './EmptyDataTable';
import {usePagesStore} from '../../store/usePagesStore';
import {useFiltersStore} from '../../store/useFiltersStore';
import {useDate} from '../../store/useDateStore';
import {useEffect, useRef} from 'react';
import ClickToFilter from './ClickToFilter';
import InsightsHeader from './InsightsHeader';
import GridItem from '../common/GridItem';

const PagesBlock = () => {
  const loading = usePagesStore((state) => state.loading);
  const data = usePagesStore((state) => state.data);

  const loadingClass = loading ? 'burst-loading' : '';
  // if data is an empty array, show the empty data table
  if (data.length !== 0) {
    const renderPageUrlCell = (row) => (
        <ClickToFilter filter="page_url" filterValue={row.page_url}>
          {decodeURI(row.page_url)}
        </ClickToFilter>
    );

    data.columns[0].cell = renderPageUrlCell;
  }

  let tableData = data.data;
  let columns = data.columns;

  return (
      <GridItem
          className={'burst-column-2 border-to-border datatable'}
          title={__('Per page', 'burst-statistics')}
      >
        <div className={`burst-loading-container ${loadingClass}`}>
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
              noDataComponent={<EmptyDataTable/>}
          />
        </div>
      </GridItem>
  );
};

export default PagesBlock;
