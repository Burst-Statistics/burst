import {__} from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import EmptyDataTable from './EmptyDataTable';
import {useFiltersStore} from '../../store/useFiltersStore';
import {useDate} from '../../store/useDateStore';
import ClickToFilter from './ClickToFilter';
import GridItem from '../common/GridItem';
import {useQuery} from '@tanstack/react-query';
import getPagesData from '../../api/getPagesData';

const PagesBlock = () => {
  const {startDate, endDate, range} = useDate((state) => state);
  const filters = useFiltersStore((state) => state.filters);

  const args = {'filters': filters, 'metrics': ['page_url', 'pageviews']};
  const query = useQuery({
    queryKey: ['pages', startDate, endDate, args],
    queryFn: () => getPagesData({startDate, endDate, range, args})
  });

  const data = query.data || {};

  const loading = query.isLoading || query.isFetching;

  const loadingClass = loading ? 'burst-loading' : '';
  // if data is an empty array, show the empty data table
  if (query.isFetched && data.length !== 0 && data.columns) {
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
