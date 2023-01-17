import { __, _x } from '@wordpress/i18n';
import {
    useState,
    useEffect
} from '@wordpress/element';
import DataTable from "react-data-table-component";
import EmptyDataTable from './EmptyDataTable';
import * as burst_api from "../utils/api";

const PagesBlock = (props) => {
    const dateRange = props.dateRange;
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const range = dateRange.range;
    const [pages, setPagesData] = useState([]);
    const [metrics, setMetrics] = useState(['pageviews']); // as of now we only support 1 metric
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let args = {
            metrics: metrics,
        }
        getPagesData(startDate, endDate, args).then((response) => {
            response.columns[0].selector = row => row.page; // select data for page column

            // foreach metrics add column
            response.columns.forEach((column, index) => {
                if (index > 0) {
                    column.selector = row => row[metrics[index - 1]];
                }
            });
            // foreach data convert to int
            response.data.forEach((row, index) => {
                metrics.forEach((metric, index) => {
                    row[metric] = parseInt(row[metric]);
                });
            });
            setPagesData(response);
        }).catch((error) => {
            console.error(error);
        });
      }, [startDate, endDate, metrics]
    )

    function getPagesData(startDate, endDate, args){
        setLoading(true);
        return burst_api.getData('pages', startDate, endDate, range, args).then( ( response ) => {
            setLoading(false);
            return response;
        });
    }

    let loadingClass = loading ? 'burst-loading' : '';
    return(
        <div className={"burst-loading-container " + loadingClass}>
            <DataTable
                columns={pages.columns}
                data={pages.data}
                defaultSortFieldId={1}
                pagination
                paginationRowsPerPageOptions={[10, 25, 50, 100, 200]}
                paginationPerPage={10}
                paginationComponentOptions={{
                    rowsPerPageText: '',
                    rangeSeparatorText: _x('of', 'Range separator text. Used for displaying rows. E.g. "10 of 200"' , 'burst-statistics'),
                    noRowsPerPage: false,
                    selectAllRowsItem: true,
                    selectAllRowsItemText: __('All', 'burst-statistics')}}
                noDataComponent={<EmptyDataTable></EmptyDataTable>}
            />
        </div>
    );
    
}

export default PagesBlock;

