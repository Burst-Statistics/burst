import { __ } from '@wordpress/i18n';
import {
    useState,
    useEffect
} from '@wordpress/element';
import DataTable from "react-data-table-component";
import EmptyDataTable from './EmptyDataTable';
import * as burst_api from "../utils/api";

const ReferrersBlock = (props) => {
    const dateRange = props.dateRange;
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const [referrers, setReferrersData] = useState([]);
    const [metrics, setmetrics] = useState(['visitors']); // as of now we only support 1 metric

    useEffect(() => {
        let args = {
            metrics: metrics,
        }
        getReferrersData(startDate, endDate, args).then((response) => {
            response.columns[0].selector = row => row.referrer; // select data for page column
            response.columns[1].selector = row => row.count; // select data for page column

            setReferrersData(response);
        }).catch((error) => {
            console.error(error);
        });
      }, [startDate, endDate, metrics]
    )

    function getReferrersData(startDate, endDate, args){
        return burst_api.getData('referrers', startDate, endDate, args).then( ( response ) => {
            return response.data;
        });
    }


    return(
        <DataTable
            columns={referrers.columns}
            data={referrers.data}
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

export default ReferrersBlock;

