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
import {Button} from '@wordpress/components';

const GoalsBlock = () => {
  const [goals, setGoalsData] = useState(
      {
        live: {
          title: __('Live', 'burst-statistics'),
          value: '-',
          icon: 'goals',
        },
        goals: {
          title: __('Total', 'burst-statistics'),
          value: '-',
          icon: 'goals',
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

  function getData(startDate, endDate){
    getGoalsData(startDate, endDate).then((response) => {

      // setGoalsData(data);
    }).catch((error) => {
      console.error(error);
    });
  }

  function getGoalsData(startDate, endDate, args= []){
    // return burst_api.getData('goals', startDate, endDate, args).then( ( response ) => {
    //   return response.data;
    // });
  }

  const delayTooltip = 200;
  if (goals) {
    return(
        <>
          <div className="information-overlay">
            <div className="information-overlay-container">
              <h4>{__('Coming soon: Goals', 'burst-statistics')}</h4>
              <p>{__('Know what is happening on your website. Keep track of customizable goals and get valuable insights. Coming soon to Burst Statistics.', 'burst-statistics')}</p>

              {/*<h6>{__('Contribute', 'burst-statistics')}</h6>*/}
              {/*<p>{__("We're building this plugin together with you, the WordPress community, to make it the best statistics plugin to date.", 'burst-statistics')}</p>*/}
              {/*<p>{__('Help make our product better by leaving a suggestion on the Wordpress forum.', 'burst-statistics')}</p>*/}
              <a href="https://wordpress.org/support/plugin/burst-statistics/" target="_blank" rel="noreferrer" className="button button-default">{__('Leave a suggestion', 'burst-statistics')}</a>
            </div>

          </div>
          <div className="burst-goals">
            <div className="burst-goals-select">
              <Tooltip arrow title={goals.live.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-select-item">
                  <Icon name={goals.live.icon} size='23' />
                  <h2>{goals.live.value}</h2>
                  <span><Icon name='live' size='13' color={'green'} /> Live</span>
                </div>
              </Tooltip>
              <Tooltip arrow title={goals.goals.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-select-item">
                  <Icon name={goals.goals.icon} size='23' />
                  <h2>{goals.goals.value}</h2>
                  <span><Icon name='total' size='13' color={'green'} /> Total</span>
                </div>
              </Tooltip>
            </div>
            <div className="burst-goals-list">
              <Tooltip arrow title={goals.mostViewed.tooltip} enterDelay={delayTooltip}>
                <div className="burst-goals-list-item">
                  <Icon name="winner" />
                  <p className='burst-goals-list-item-text'>{goals.mostViewed.title}</p>
                  <p className='burst-goals-list-item-number'>{goals.mostViewed.value}</p>
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
        </>
    );
  } else {
    return (
        <Placeholder lines = '10'/>
    )
  }
}
export default GoalsBlock;