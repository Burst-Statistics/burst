import { __ } from '@wordpress/i18n';
import {
    useState,
    useEffect
} from '@wordpress/element';
import Placeholder from '../Placeholder/Placeholder';
import { intervalToDuration } from 'date-fns'

import * as burst_api from "../utils/api";

const CompareBlock = (props) => {
    const dateRange = props.dateRange;
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const [compare, setCompareData] = useState(false);
    const metrics = {
        'pageviews': __('Pageviews', 'burst-statistics'),
        'sessions': __('Sessions', 'burst-statistics'),
        'visitors': __('Visitors', 'burst-statistics'),
        'bounced_sessions': __('Bounce Rate', 'burst-statistics'),
    };

    useEffect(() => {
        getCompareData(startDate, endDate).then((response) => {
            // loop through object metrics and place and edit data to be ready for display
            let data = {};
            let curr = response.current;
            let prev = response.previous;
            console.log(response)
            for (const [key, value] of Object.entries(metrics)) {
                let change = getChangePercentage(curr[key], prev[key]);
                Object.assign(data, {
                    [key]: {
                        'title': value,
                        'subtitle': '',
                        'value': formatNumber(curr[key], 1),
                        'change': change.val,
                        'changeStatus': change.status,
                    }
                });
            }
            console.log(data)

            // Add subtitles and change metrics
            let pageviewsPerSession = curr.pageviews / curr.sessions;
            let timePerSession = pageviewsPerSession * curr.avg_time_on_page;
            data.pageviews.subtitle = formatNumber(pageviewsPerSession) + ' ' + __('pageviews per session', 'burst-statistics');
            data.sessions.subtitle = formatTime(timePerSession) + ' ' + __('per session', 'burst-statistics');
            data.visitors.subtitle = getPercentage(curr.first_time_visitors, curr.visitors) + ' ' + __('are new visitors', 'burst-statistics');
            data.bounced_sessions.subtitle =  curr.bounced_sessions + ' ' + __('visitors bounced', 'burst-statistics');
            data.bounced_sessions.value = getBouncePercentage(curr.bounced_sessions, curr.sessions);

            console.log(data)

            setCompareData(data);
        }).catch((error) => {
            console.error(error);
        });
      }, [startDate, endDate]
    )

    function getCompareData(startDate, endDate, args){
        return burst_api.getData('compare', startDate, endDate, args).then( ( response ) => {
            return response.data;
        });
    }
    // @todo move to utils
    function getPercentage(val, total){
        val = Number(val);
        total = Number(total);
        let percentage = val / total;
        if (isNaN(percentage)){
            percentage = 0;
        }
        return new Intl.NumberFormat(
            undefined,
            {
                style: 'percent',
                maximumFractionDigits: 1,
            }).format(percentage);
    }

    function getChangePercentage(currValue, prevValue){
        currValue = Number(currValue);
        prevValue = Number(prevValue);
        let change = {}
        let percentage = (currValue - prevValue) / prevValue;
        if (isNaN(percentage)){
            percentage = 0;
        }
        change.val = new Intl.NumberFormat(
            undefined,
            {
                style: 'percent',
                maximumFractionDigits: 1,
                signDisplay: "exceptZero",
            }).format(percentage);
        change.status = (percentage > 0) ? 'positive' : 'negative';

        return change;
    }

    function getBouncePercentage(bounced_sessions, sessions){
        bounced_sessions = Number(bounced_sessions);
        sessions = Number(sessions);
        return getPercentage(bounced_sessions, sessions + bounced_sessions);
    }

    function formatTime(timeInMilliSeconds = 0) {
        let timeInSeconds = Number(timeInMilliSeconds);
        if (isNaN(timeInSeconds)){
            timeInSeconds = 0;
        }

        let duration = intervalToDuration({ start: 0, end: timeInSeconds });
        const zeroPad = (num) => String(num).padStart(2, '0')

        const formatted = [
            duration.hours,
            duration.minutes,
            duration.seconds,
        ].map(zeroPad);

        return formatted.join(':');
    }

    function formatNumber(value, decimals = 1){
        value = Number(value);
        if (isNaN(value)){
            value = 0;
        }
        return new Intl.NumberFormat(undefined, {
            style: "decimal",
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: decimals,
        }).format(value);
    }
    if (compare) {
        return(
                <>
                 {Object.keys(compare).map((key, i) => {
                    let m = compare[key];
                    return <div className="block__explanation-and-stats" key={i}>
                        <div className="block__explanation-and-stats__left">
                            <h3 className="burst-h5">{m.title}</h3>
                            <p>{m.subtitle}</p>
                        </div>
                        <div className="block__explanation-and-stats__right">
                            <span className="burst-h4">{m.value}</span>
                            <p className={'uplift ' + m.changeStatus}>
                                {m.change}
                            </p>
                        </div>
                    </div>
                 })}
                </>
        );
    } else {
        return (
            <Placeholder lines = '10'/>
        )
    }
}


export default CompareBlock;

