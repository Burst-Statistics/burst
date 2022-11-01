import { __ } from '@wordpress/i18n';
import {
    Component,
} from '@wordpress/element';

class EmptyDataTable extends Component {
    render(){
        return(
            <div className="burst-empty-data-table">
                <p className={"burst-small-text"}>{__('No data available in table', 'burst-statistics')}</p>
            </div>
        );
    }
}

export default EmptyDataTable;

