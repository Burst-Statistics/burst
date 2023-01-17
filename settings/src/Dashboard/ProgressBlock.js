import {
    Component,
} from '@wordpress/element';

import * as burst_api from "../utils/api";
import TaskElement from "./TaskElement";
import { __ } from '@wordpress/i18n';
import Placeholder from '../Placeholder/Placeholder';

class ProgressBlock extends Component {
    constructor() {
        super( ...arguments);
        this.percentageCompleted = 0;
        this.progressText = '';
        this.filter = 'all';
        this.notices = null;
        this.progressLoaded = false;
        this.fields = this.props.fields;
        this.state = {
            progressText:'',
            filter:'all',
            notices:null,
            percentageCompleted:0,
            progressLoaded: false,
        };

    }
    componentDidMount() {
        this.getProgressData = this.getProgressData.bind(this);
        this.onCloseTaskHandler = this.onCloseTaskHandler.bind(this);
        this.getProgressData();
    }

    componentDidUpdate() {
        //if a field has changed, we update the progress data as well.
        if ( this.fields !== this.props.fields ) {
            this.fields = this.props.fields;
            this.getProgressData();
        }
    }
    getStyles() {
        return Object.assign(
            {},
            {width: this.percentageCompleted+"%"},
        );
    }

    getProgressData(){
        burst_api.runTest('progressData', 'refresh').then( ( response ) => {
            this.filter = response.filter;
            this.notices = response.notices;
            this.progressLoaded = true;

            this.setState({
                progressLoaded: this.progressLoaded,
                filter: this.filter,
                notices: this.notices,
            });
            this.props.setBlockProps('notices',this.notices);
        });
    }

    onCloseTaskHandler(e){
        let button = e.target.closest('button');
        let notice_id = button.getAttribute('data-id');
        let container = button.closest('.burst-task-element');
        container.animate({
            marginLeft: ["0px", "-200%"],
            opacity: [1, 0]
        }, {
            duration: 300,
            easing: "ease",
            fill: "both"
        }).onfinish = function() {
            container.animate({
                height: ["auto", "0px"],
            }, {
                duration: 100,
                easing: "ease",
                fill: "both"
            }).onfinish = function() {
                container.parentElement.removeChild(container);
            }
        }

        let notices = this.props.BlockProps.notices;
        notices = notices.filter(function (notice) {
            return notice.id !== notice_id;
        });

        this.props.setBlockProps('notices', notices);
        return burst_api.runTest('dismiss_task', notice_id).then(( response ) => {
            this.percentageCompleted = response.percentage;
            this.setState({
                percentageCompleted:this.percentageCompleted
            })
        });
    }


    render(){
        let henk = false;
        const n = 1;
        if ( !this.progressLoaded ) {
            return (
                <div className="burst-progress-block">
                    <div className="burst-scroll-container">
                        {[...Array(n)].map((e, i) =>
                            <div key={i} className="burst-task-element">
                                <span className={'burst-task-status burst-loading'}>{__('Loading...', 'burst-statistics')}</span>
                                <p className="burst-task-message">{__('Loading notices...', 'burst-statistics')}</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        let filter = 'all';
        if ( this.props.BlockProps && this.props.BlockProps.filterStatus ) {
            filter = this.props.BlockProps.filterStatus;
        }
        let notices = this.notices;
        if ( filter==='remaining' ) {
            notices = notices.filter(function (notice) {
                return notice.output.status==='open';
            });
        }

        return (
            <div className="burst-progress-block">
                <div className="burst-scroll-container">
                    {notices.map((notice, i) => <TaskElement key={i} index={i} notice={notice} onCloseTaskHandler={this.onCloseTaskHandler} highLightField={this.props.highLightField}/>)}
                </div>
            </div>
        );
    }
}
export default ProgressBlock;
