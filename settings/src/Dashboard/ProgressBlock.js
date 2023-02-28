import {
    Component,
    useState,
    useEffect
} from 'react';

import * as burst_api from "../utils/api";
import TaskElement from "./TaskElement";
import { __ } from '@wordpress/i18n';
import useNotices from '../data/dashboard/notices';

const ProgressBlock = (props) => {
    const { loading, filter, notices, getNotices, filteredNotices, setFilter, dismissNotice} = useNotices();
    useEffect(() => {
        getNotices();
    }, []);

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

    const displayNotices = filter === 'remaining' ? filteredNotices : notices;

  return (
        <div className="burst-progress-block">
            <div className="burst-scroll-container">
                {displayNotices.map((notice, i) => <TaskElement key={i} index={i} notice={notice} onCloseTaskHandler={() => dismissNotice(notice.id)} highLightField={props.highLightField}/>)}
            </div>
        </div>
    );
}

export default ProgressBlock;