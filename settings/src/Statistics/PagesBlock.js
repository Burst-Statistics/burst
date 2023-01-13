import {__} from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import EmptyDataTable from './EmptyDataTable';
import {usePagesStats} from '../data/statistics/pages';
import {ClickableRowItem} from './ClickableRowItem';

const PagesBlock = () => {
  const {loading, data} = usePagesStats();
  // change cell to clickable
  let columns = data.columns;
  // make cell not clickable h1
  columns[0].cell = (row) => {
    if (row.page_id !== 0 && row.page_id !== '0') {
      return <ClickableRowItem page={row.page} id={row.page_id}/>;
    }
    else {
      return <div className={"burst-not-clickable-row-item"}>{row.page}</div>;
    }
  };

  let loadingClass = loading ? 'burst-loading' : '';
  return (
      <div className={'burst-loading-container ' + loadingClass}>
        <DataTable
            columns={columns}
            data={data.data}
            defaultSortFieldId={1}
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

