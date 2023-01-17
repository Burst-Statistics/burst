import { __, _x } from '@wordpress/i18n';
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
    const range = dateRange.range;
    let [loading, setLoading] = useState(true);
    const [referrers, setReferrersData] = useState([]);
    const [metrics, setmetrics] = useState(['visitors']); // as of now we only support 1 metric

    useEffect(() => {
        let args = {
            metrics: metrics,
        }
        getReferrersData(startDate, endDate, args).then((response) => {
            response.columns[0].selector = row => row.referrer; // select data for referrer column
            response.columns[1].selector = row => row.count; // select data for count column
            // foreach data convert to int
            response.data.forEach((row, index) => {
                row.count = parseInt(row.count);
            });
            setReferrersData(response);
        }).catch((error) => {
            console.error(error);
        });
      }, [startDate, endDate, metrics]
    )

    function getReferrersData(startDate, endDate, args){
        setLoading(true);
        return burst_api.getData('referrers', startDate, endDate, range, args).then( ( response ) => {
            setLoading(false);
            return response;
        });
    }

    let loadingClass = loading ? 'burst-loading' : '';
    return(
        <div className={"burst-loading-container " + loadingClass}>
            <DataTable
                columns={referrers.columns}
                data={referrers.data}
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

export default ReferrersBlock;

