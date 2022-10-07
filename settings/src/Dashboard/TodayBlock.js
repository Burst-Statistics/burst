import { __ } from '@wordpress/i18n';
import {
    useState,
    useEffect
} from '@wordpress/element';
import Placeholder from '../Placeholder/Placeholder';
import Tooltip from '@mui/material/Tooltip';

import * as burst_api from "../utils/api";
import Icon from '../utils/Icon';
import {endOfDay, format, intervalToDuration, startOfDay} from 'date-fns';

const TodayBlock = () => {
    // const dateRange = props.dateRange;
    // const startDate = dateRange.startDate;
    // const endDate = dateRange.endDate;
    const [today, setTodayData] = useState(
        {
            live: {
                title: __('Live', 'burst-statistics'),
                value: '-',
                icon: 'visitor',
            },
            today: {
                title: __('Total', 'burst-statistics'),
                value: '-',
                icon: 'visitor',
            },
            mostViewed: {
                title: '-',
                value: '-',
            },
            pageviews: {
                title: '-',
                value: '-',
            },
            referrer: {
                title: '-',
                value: '-',
            },
            timeOnPage: {
                title: '-',
                value: '-',
            }
        }
    );

    const startDate = format(startOfDay(new Date()), 'yyyy-MM-dd');
    const endDate = format(endOfDay(new Date()), 'yyyy-MM-dd');

    useEffect(() => {
        getData(startDate, endDate);
        const interval = setInterval(() => {
            getData(startDate, endDate);
            // startAnimation(5000);
        }, 5000)

        return () => clearInterval(interval);
        }, [startDate, endDate]
    )

    function getData(startDate, endDate){
        getTodayData(startDate, endDate).then((response) => {
            let data = response;
            data.live.icon = selectVisitorIcon(data.live.value);
            data.today.icon = selectVisitorIcon(data.today.value);

            data.timeOnPage.value = formatTime(data.timeOnPage.value);

            // @todo loop through vals formatNumber(val)

            setTodayData(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    function getTodayData(startDate, endDate, args= []){
        return burst_api.getData('today', startDate, endDate, args).then( ( response ) => {
            return response.data;
        });
    }

    function selectVisitorIcon(value){
        value = parseInt(value);
        if( value > 100) {
            return 'visitors-crowd';
        } else if ( value > 10 ) {
            return 'visitors';
        } else {
            return 'visitor';
        }
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

    function formatTime(timeInMilliSeconds) {
        let timeInSeconds = Number(timeInMilliSeconds);
        let duration = intervalToDuration({ start: 0, end: timeInSeconds });
        const zeroPad = (num) => String(num).padStart(2, '0')

        const formatted = [
            duration.hours,
            duration.minutes,
            duration.seconds,
        ].map(zeroPad);

        return formatted.join(':');
    }
    const delayTooltip = 200;
    if (today) {
        return(
            <>
                <div className="burst-today">
                    <div className="burst-today-select">
                        <Tooltip arrow title={today.live.tooltip} enterDelay={delayTooltip}>
                            <div className="burst-today-select-item">
                                <Icon name={today.live.icon} size='23' />
                                <h2>{today.live.value}</h2>
                                <span><Icon name='live' size='13' color={'green'} /> Live</span>
                            </div>
                        </Tooltip>
                        <Tooltip arrow title={today.today.tooltip} enterDelay={delayTooltip}>
                            <div className="burst-today-select-item">
                                <Icon name={today.today.icon} size='23' />
                                <h2>{today.today.value}</h2>
                                <span><Icon name='total' size='13' color={'green'} /> Total</span>
                            </div>
                        </Tooltip>
                    </div>
                    <div className="burst-today-list">
                        <Tooltip arrow title={today.mostViewed.tooltip} enterDelay={delayTooltip}>
                            <div className="burst-today-list-item">
                                <Icon name="winner" />
                                <p className='burst-today-list-item-text'>{today.mostViewed.title}</p>
                                <p className='burst-today-list-item-number'>{today.mostViewed.value}</p>
                            </div>
                        </Tooltip>
                        <Tooltip arrow title={today.referrer.tooltip} enterDelay={delayTooltip}>
                            <div className="burst-today-list-item">
                                <Icon name="referrer" />
                                <p className='burst-today-list-item-text'>{today.referrer.title}</p>
                                <p className='burst-today-list-item-number'>{today.referrer.value}</p>
                            </div>
                        </Tooltip>
                        <Tooltip arrow title={today.pageviews.tooltip} enterDelay={delayTooltip}>
                            <div className="burst-today-list-item">
                                <Icon name="pageviews" />
                                <p className='burst-today-list-item-text'>{today.pageviews.title}</p>
                                <p className='burst-today-list-item-number'>{today.pageviews.value}</p>
                            </div>
                        </Tooltip>
                        <Tooltip arrow title={today.timeOnPage.tooltip} enterDelay={delayTooltip}>
                            <div className="burst-today-list-item">
                                <Icon name="time" />
                                <p className='burst-today-list-item-text'>{today.timeOnPage.title}</p>
                                <p className='burst-today-list-item-number'>{today.timeOnPage.value}</p>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <Placeholder lines = '10'/>
        )
    }
}
export default TodayBlock;