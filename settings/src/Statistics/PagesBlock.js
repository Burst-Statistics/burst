import {__} from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import EmptyDataTable from './EmptyDataTable';
import {usePagesStats} from '../data/statistics/pages';
import {ClickableRowItem} from './ClickableRowItem';
import ClickToFilter from './ClickToFilter';

const PagesBlock = () => {
  const {loading, data} = usePagesStats();
  let loadingClass = loading ? 'burst-loading' : '';

  // if data is empty array, then we need to show empty data table
  if (data.length === 0) {
    return (
        <div className={'burst-loading-container ' + loadingClass}>
          return <EmptyDataTable/>;
        </div>
    );
  }

  data.columns[0].cell = (row) => {
    if (row.page_id !== 0 && row.page_id !== '0') {
      return (
          <ClickToFilter filter="page_id" filterValue={row.page_id}>
            {row.page_url}
          </ClickToFilter>
      );
    }
    else {
      return (
          <ClickToFilter filter="page_url" filterValue={row.page_url}>
            {row.page_url}
          </ClickToFilter>
      );
    }
  };
  let tableData = data.data;
  let columns = data.columns;

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

export default PagesBlock;

