import { __ } from '@wordpress/i18n';
import {
    useState,
    useEffect
} from 'react';
import DataTable from "react-data-table-component";
import EmptyDataTable from './EmptyDataTable';
import * as burst_api from "../utils/api";
import {UseReferrersStats} from '../data/statistics/referrers';

const ReferrersBlock = (props) => {
    const { loading, data } = UseReferrersStats();
    let loadingClass = loading ? 'burst-loading' : '';
    return(
        <div className={"burst-loading-container " + loadingClass}>
            <DataTable
                columns={data.columns}
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
                    selectAllRowsItemText: __('All', 'burst-statistics')}}
                noDataComponent={<EmptyDataTable></EmptyDataTable>}
            />
        </div>
    );
    
}

export default ReferrersBlock;

