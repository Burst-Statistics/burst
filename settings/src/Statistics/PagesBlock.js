import { __ } from '@wordpress/i18n';
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
    const [pages, setPagesData] = useState([]);
    const [metrics, setmetrics] = useState(['visitors']); // as of now we only support 1 metric

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

            setPagesData(response);
        }).catch((error) => {
            console.error(error);
        });
      }, [startDate, endDate, metrics]
    )

    function getPagesData(startDate, endDate, args){
        return burst_api.getData('pages', startDate, endDate, args).then( ( response ) => {
            return response.data;
        });
    }


    return(
        <DataTable
            columns={pages.columns}
            data={pages.data}
            defaultSortFieldId={1}
            striped
            pagination
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            // progressPending add laoding animation
            // progressComponent
            // highlightOnHover
            // pointerOnHover
            paginationComponentOptions={{ rowsPerPageText: '', rangeSeparatorText: __('of', 'burst-statistics'), noRowsPerPage: false, selectAllRowsItem: false}}
            // paginationResetDefaultPage={resetPaginationToggle}
            noDataComponent={<EmptyDataTable></EmptyDataTable>}
        />
    );
    
}

export default PagesBlock;

