import {
    Component,
    useState,
    useEffect
} from 'react';

import * as burst_api from "../utils/api";
import TaskElement from "./TaskElement";
import { __ } from '@wordpress/i18n';

const ProgressBlock = (props) => {
        const [filter, setFilter] = useState('all');
        const [notices, setNotices] = useState([]);
        const [loading, setLoading] = useState(true);
        const fields = props.fields;

    const getProgressData = () => {
        burst_api.runTest('progressData', 'refresh').then( ( response ) => {
            setFilter(response.filter);
            setNotices(response.notices);
            console.log(response);
            // props.setBlockProps('notices',notices);
        });
    }

    // only run on mount
    useEffect(() => {
        getProgressData();
    }, []);

    const onCloseTaskHandler = (e) => {
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

        let notices = props.BlockProps.notices;
        notices = notices.filter(function (notice) {
            return notice.id !== notice_id;
        });
        setNotices(notices);

        return burst_api.runTest('dismiss_task', notice_id).then(( response ) => {
            console.log('dismissed');
        });
    }


        if ( loading ) {
            return (
                <div className="burst-progress-block">
                    <div className="burst-scroll-container">
                        <div className="burst-task-element">
                            <span
                                className={'burst-task-status burst-loading'}>{__(
                                'Loading...', 'burst-statistics')}</span>
                            <p className="burst-task-message">{__(
                                'Loading notices...', 'burst-statistics')}</p>
                        </div>
                    </div>
                </div>
            );
        }
        if ( props.BlockProps && props.BlockProps.filterStatus ) {
            setFilter(props.BlockProps.filterStatus);
        }
        if ( filter==='remaining' ) {
            notices.filter(function (notice) {
                return notice.output.status==='open';
            });
        }

        return (
            <div className="burst-progress-block">
                <div className="burst-scroll-container">
                    {notices.map((notice, i) => <TaskElement key={i} index={i} notice={notice} onCloseTaskHandler={onCloseTaskHandler} highLightField={props.highLightField}/>)}
                </div>
            </div>
        );
}
export default ProgressBlock;
