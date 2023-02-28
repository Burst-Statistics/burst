import { __ } from '@wordpress/i18n';

const EmptyDataTable = (props) => {
        return(
            <div className="burst-empty-data-table">
                <p className={"burst-small-text"}>{__('No data available in table', 'burst-statistics')}</p>
            </div>
        );
}

export default EmptyDataTable;

