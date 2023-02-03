import { __ } from '@wordpress/i18n';
import {
    formatTime,
    formatNumber,
} from '../utils/formatting';
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
    // get currentDate
    const currentDate = new Date();

    // get client's timezone offset in minutes
    const clientTimezoneOffsetMinutes = currentDate.getTimezoneOffset();

    // convert client's timezone offset from minutes to seconds
    const clientTimezoneOffsetSeconds = clientTimezoneOffsetMinutes * -60;

    // get current unix timestamp
    const currentUnix = Math.floor(currentDate.getTime() / 1000);
    // add burst_settings.gmt_offset x hour and client's timezone offset in
    // seconds to currentUnix
    const currentUnixWithOffsets = currentUnix +
        (burst_settings.gmt_offset * 3600) - clientTimezoneOffsetSeconds;

    // get current date by currentUnixWithOffsets
    const currentDateWithOffset = new Date(currentUnixWithOffsets * 1000);

    const startDate = format(startOfDay(currentDateWithOffset), 'yyyy-MM-dd');
    const endDate = format(endOfDay(currentDateWithOffset), 'yyyy-MM-dd');

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
            // map data formatNumber
            for (const [key, value] of Object.entries(data)) {
                if (key === 'timeOnPage' ) {
                    data[key].value = formatTime(value.value);
                } else {
                    data[key].value = formatNumber(value.value);
                }
            }
            setTodayData(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    function getTodayData(startDate, endDate, args= []){
        return burst_api.getData('today', startDate, endDate, 'custom', args).then( ( response ) => {
            return response;
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
                                <span><Icon name='live' size='12' color={'red'} /> Live</span>
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