import {
    Component,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
class ChangeStatus extends Component {
    constructor() {
        super( ...arguments );
    }

    render(){
        let statusClass = this.props.item.status==1 ? 'button button-primary burst-status-allowed' : 'button button-default burst-status-revoked';
        let label = this.props.item.status==1 ? __("Revoke", "burst-statistics") : __("Allow", "burst-statistics");
        return (
            <button onClick={ () => this.props.onChangeHandlerDataTable(!this.props.item.status, this.props.item, 'status' ) } className={statusClass}>{label}</button>
        )
    }
}
export default ChangeStatus