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
import {formatTime, formatNumber} from '../utils/formatting';

const GoalsBlock = () => {
  const [goals, setGoalsData] = useState(
      {
        today: {
          title: __('Today', 'burst-statistics'),
          value: '-',
          icon: 'goals',
        },
        total: {
          title: __('Total', 'burst-statistics'),
          value: '-',
          icon: 'goals',
        },
        topPerformer: {
          title: '-',
          value: '-',
        },
        visitors: {
          title: '-',
          value: '-',
        },
        conversionPercentage: {
          title: '-',
          value: '-',
        },
        timeOnGoal: {
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
    getGoalsData(startDate, endDate).then((response) => {
      let data = response;
      // map data formatNumber
      for (const [key, value] of Object.entries(data)) {
          data[key].value = formatNumber(value.value);
      }
      // setGoalsData(data);
    }).catch((error) => {
      console.error(error);
    });
  }

  function getGoalsData(startDate, endDate, args= []){
    return burst_api.getData('goals', startDate, endDate, 'custom', args).then( ( response ) => {
      return response.data;
    });
  }

  const delayTooltip = 200;
  if (goals) {
    return(
          <div className="burst-goals">
            <div className="burst-goals-select">
              <Tooltip arrow title={goals.today.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-select-item">
                  <Icon name={goals.today.icon} size='23' />
                  <h2>{goals.today.value}</h2>
                  <span><Icon name='live' size='13' color={'green'} /> Live</span>
                </div>
              </Tooltip>
              <Tooltip arrow title={goals.total.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-select-item">
                  <Icon name={goals.total.icon} size='23' />
                  <h2>{goals.total.value}</h2>
                  <span><Icon name='total' size='13' color={'green'} /> Total</span>
                </div>
              </Tooltip>
            </div>
            <div className="burst-goals-list">
              <Tooltip arrow title={goals.topPerformer.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-list-item">
                  <Icon name="winner" />
                  <p className='burst-goals-list-item-text'>{goals.topPerformer.title}</p>
                  <p className='burst-goals-list-item-number'>{goals.topPerformer.value}</p>
                </div>
              </Tooltip>
              <Tooltip arrow title={goals.referrer.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-list-item">
                  <Icon name="visitors" />
                  <p className='burst-goals-list-item-text'>{goals.referrer.title}</p>
                  <p className='burst-goals-list-item-number'>{goals.referrer.value}</p>
                </div>
              </Tooltip>
              <Tooltip arrow title={goals.pageviews.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-list-item">
                  <Icon name="graph" />
                  <p className='burst-goals-list-item-text'>{goals.pageviews.title}</p>
                  <p className='burst-goals-list-item-number'>{goals.pageviews.value}</p>
                </div>
              </Tooltip>
              <Tooltip arrow title={goals.timeOnPage.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-list-item">
                  <Icon name="time" />
                  <p className='burst-goals-list-item-text'>{goals.timeOnPage.title}</p>
                  <p className='burst-goals-list-item-number'>{goals.timeOnPage.value}</p>
                </div>
              </Tooltip>
            </div>
          </div>
    );
  } else {
    return (
        <Placeholder lines = '10'/>
    )
  }
}
export default GoalsBlock;