import { __ } from '@wordpress/i18n';
import {
    Component,
} from '@wordpress/element';

class ProgressHeader extends Component {
    constructor()
    {
        super(...arguments);
        this.filter = 'all';
    }

    componentDidMount() {
        this.onClickHandler = this.onClickHandler.bind(this);
        this.setState({
            filter: this.filter,
        })
    }

    onClickHandler(e){
        let filter = e.target.getAttribute('data-filter');
        if (filter==='all' || filter==='remaining') {
            this.filter = filter;
            this.setState({
                filter: this.filter,
            })
            this.props.setBlockProps('filterStatus', filter);
            sessionStorage.burst_task_filter = filter;
        }
    }

    render(){
        if ( typeof (Storage) !== "undefined" && sessionStorage.burst_task_filter  ) {
            this.filter = sessionStorage.burst_task_filter;
        }
        let all_task_count = 0;
        let open_task_count = 0;
        let notices =[];
        if ( this.props.BlockProps && this.props.BlockProps.notices ){
            notices = this.props.BlockProps.notices;
            all_task_count = notices.length;
            let openNotices = notices.filter(function (notice) {
                return notice.output.status==='open';
            });
            open_task_count = openNotices.length;
        }

        return (
            <div className={"burst-task-switcher-container burst-active-filter-"+this.filter}>
                <span className="burst-task-switcher burst-all-tasks" onClick={this.onClickHandler} htmlFor="burst-all-tasks" data-filter="all">
                        { __( "All tasks", "burst-statistics" ) }
                        <span className="burst_task_count">({all_task_count})</span>
                </span>
                <span className="burst-task-switcher burst-remaining-tasks" onClick={this.onClickHandler} htmlFor="burst-remaining-tasks" data-filter="remaining">
                        { __( "Remaining tasks", "burst-statistics" )}
                        <span className="burst_task_count">({open_task_count})</span>
                </span>
            </div>
        );
    }
}
export default ProgressHeader;
