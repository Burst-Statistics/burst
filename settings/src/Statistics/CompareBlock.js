import { __ } from '@wordpress/i18n';
import {
    useState,
    useEffect
} from '@wordpress/element';
import Placeholder from '../Placeholder/Placeholder';
import { intervalToDuration } from 'date-fns'
import {getChangePercentage, formatNumber, getPercentage, getBouncePercentage, formatTime} from '../utils/formatting';
import * as burst_api from "../utils/api";
import Icon from "../utils/Icon";

const CompareBlock = (props) => {
    const dateRange = props.dateRange;
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const range = dateRange.range;
    const metrics = {
        'pageviews': __('Pageviews', 'burst-statistics'),
        'sessions': __('Sessions', 'burst-statistics'),
        'visitors': __('Visitors', 'burst-statistics'),
        'bounced_sessions': __('Bounce Rate', 'burst-statistics'),
    };
    let [loading, setLoading] = useState(true);
    let defaultData = {};
    // loop through metrics and set default values
    Object.keys(metrics).forEach(function (key) {
        defaultData[key] = {
            'title': metrics[key],
            'subtitle': '-',
            'value': '-',
            'change': '-',
            'changeStatus': '',
        };
    })
    const [compare, setCompareData] = useState(defaultData);


    useEffect(() => {
        getCompareData(startDate, endDate, range).then((response) => {
            // loop through object metrics and place and edit data to be ready for display
            let data = {};
            let curr = response.current;
            let prev = response.previous;
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
                // Bounce rate is a bit different
                if (key === 'bounced_sessions') {
                    // get unformatted percentage and calculate uplift
                    let bouncePercentage = getBouncePercentage(curr[key], curr['sessions'], false);
                    let bouncePercentagePrev = getBouncePercentage(prev[key], prev['sessions'], false);
                    change = getChangePercentage(bouncePercentage, bouncePercentagePrev);

                    data[key].value = getBouncePercentage(curr[key], curr['sessions']);
                    data[key].change = change.val;
                    data[key].changeStatus = change.status;
                    data[key].subtitle =  curr.bounced_sessions + ' ' + __('visitors bounced', 'burst-statistics');
                    data[key].value = getBouncePercentage(curr.bounced_sessions, curr.sessions);
                }
            }

            // Add subtitles and change metrics
            let pageviewsPerSession = curr.pageviews / curr.sessions;
            let timePerSession = pageviewsPerSession * curr.avg_time_on_page;
            data.pageviews.subtitle = formatNumber(pageviewsPerSession) + ' ' + __('pageviews per session', 'burst-statistics');
            data.sessions.subtitle = formatTime(timePerSession) + ' ' + __('per session', 'burst-statistics');
            data.visitors.subtitle = getPercentage(curr.first_time_visitors, curr.visitors) + ' ' + __('are new visitors', 'burst-statistics');

            setCompareData(data);
        }).catch((error) => {
            console.error(error);
        });
      }, [startDate, endDate]
    )

    function getCompareData(startDate, endDate, range, args){
        setLoading(true);
        return burst_api.getData('compare', startDate, endDate, range, args).then( ( response ) => {
            setLoading(false);
            return response;
        });
    }

    let loadingClass = loading ? 'burst-loading' : '';
    if (compare) {
        return(
                <>
                    <div className={"burst-loading-container " + loadingClass}>
                        {Object.keys(compare).map((key, i) => {
                            let m = compare[key];
                            return <div className="block__explanation-and-stats" key={i}>
                                <Icon name={key} />
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
                    </div>
                </>
        );
    }
}


export default CompareBlock;

