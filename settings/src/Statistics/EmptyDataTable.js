import { __ } from '@wordpress/i18n';
import {
    Component,
} from '@wordpress/element';

class EmptyDataTable extends Component {
    render(){
        return(
            <h1>No results</h1>
        );
    }
}

export default EmptyDataTable;

