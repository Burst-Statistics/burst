import {useEffect, useState} from '@wordpress/element';
import './DashboardWidget.scss';
import {setLocaleData} from '@wordpress/i18n';
import {
  getAvailableRangesWithKeys,
} from '../../../../settings/src/utils/formatting';
import getLiveVisitors from '../../../../settings/src/api/getLiveVisitors';
import getTodayData from '../../../../settings/src/api/getTodayData';
import GridItem from '../../../../settings/src/components/common/GridItem';
import Icon from '../../../../settings/src/utils/Icon';
import {format} from 'date-fns';
import {__} from '@wordpress/i18n';
import {useQueries} from '@tanstack/react-query';

/**
 * Lazy load everything to keep light weight.
 */

function selectVisitorIcon(value) {
  value = parseInt(value);
  if (value > 100) {
    return 'visitors-crowd';
  }
  else if (value > 10) {
    return 'visitors';
  }
  else {
    return 'visitor';
  }
}

const DashboardWidget = () => {
  const [range, setRange] = useState('last-7-days');
  useEffect(() => {
    burst_settings.json_translations.forEach((translationsString) => {
      let translations = JSON.parse(translationsString);
      let localeData = translations.locale_data['burst-statistics'] ||
          translations.locale_data.messages;
      localeData[''].domain = 'burst-statistics';
      setLocaleData(localeData, 'burst-statistics');
    });
  }, []);

  // This function would be triggered when the user selects a new range.
  const handleRangeSelect = (rangeKey) => {
    setRange(rangeKey);
  };

  // Get the display dates for the selected range.
  const availableRanges = getAvailableRangesWithKeys(
      ['today', 'yesterday', 'last-7-days', 'last-30-days', 'last-90-days']);
  // Get the currently selected range object.
  const selectedRange = availableRanges[range]
      ? availableRanges[range].range()
      : availableRanges['last-7-days'].range();
  const startDate = format(selectedRange.startDate, 'yyyy-MM-dd');
  const endDate = format(selectedRange.endDate, 'yyyy-MM-dd');

  const [interval, setInterval] = useState(5000);
  const placeholderData = {
    live: {
      title: __('Live', 'burst-statistics'),
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
    },
  };
  const queries = useQueries({
        queries: [
          {
            queryKey: ['live-visitors'],
            queryFn: getLiveVisitors,
            refetchInterval: interval,
            placeholderData: '-',
            onError: () => {
              setInterval(0);
            },
          },
          {
            queryKey: [range, startDate, endDate],
            queryFn: () => getTodayData({startDate, endDate}),
            refetchInterval: interval * 2,
            placeholderData: placeholderData,
            onError: () => {
              setInterval(0);
            },
          },
        ],
      },
  );

  // Your existing code
  const live = queries[0].data;
  let data = queries[1].data;
  if (queries.some((query) => query.isError)) {
    data = placeholderData;
  }
  let liveIcon = selectVisitorIcon(live ? live : 0);
  let todayIcon = 'loading';
  if (data && data.today) {
    todayIcon = selectVisitorIcon(data.today.value ? data.today.value : 0);
  }
  return (
      <GridItem
          className={'border-to-border burst-today'}
          title={__('Today', 'burst-statistics')}
          controls={<>{queries[0].isFetching
              ? <Icon name={'loading'}/>
              : null}</>}
          footer={
            <>
              <a className={'burst-button burst-button--secondary'}
                 href={burst_settings.dashboard_url + '#statistics'}>{__(
                  'View all statistics', 'burst-statistics')}</a>
              <select onChange={(e) => handleRangeSelect(e.target.value)}
                      value={range}>
                {Object.keys(availableRanges).map((key) => (
                    <option key={key} value={key}>
                      {availableRanges[key].label}
                    </option>
                ))}
              </select>
            </>
          }
      >
        <div className="burst-today">
          <div className="burst-today-select">
            <div className="burst-today-select-item">
              <Icon name={liveIcon} size="23"/>
              <h2>{live}</h2>
              <span><Icon name="live" size="12" color={'red'}/> {__('Live',
                  'burst-statistics')}</span>
            </div>
            <div className="burst-today-select-item">
              <Icon name={todayIcon} size="23"/>
              <h2>{data.today.value}</h2>
              <span><Icon name="total" size="13"
                          color={'green'}/> {__('Total',
                  'burst-statistics')}</span>
            </div>
          </div>
          <div className="burst-today-list">
            <div className="burst-today-list-item">
              <Icon name="winner"/>
              <p className="burst-today-list-item-text">{decodeURI(
                  data.mostViewed.title)}</p>
              <p className="burst-today-list-item-number">{data.mostViewed.value}</p>
            </div>
            <div className="burst-today-list-item">
              <Icon name="referrer"/>
              <p className="burst-today-list-item-text">{decodeURI(
                  data.referrer.title)}</p>
              <p className="burst-today-list-item-number">{data.referrer.value}</p>
            </div>
            <div className="burst-today-list-item">
              <Icon name="pageviews"/>
              <p className="burst-today-list-item-text">{data.pageviews.title}</p>
              <p className="burst-today-list-item-number">{data.pageviews.value}</p>
            </div>
            <div className="burst-today-list-item">
              <Icon name="time"/>
              <p className="burst-today-list-item-text">{data.timeOnPage.title}</p>
              <p className="burst-today-list-item-number">{data.timeOnPage.value}</p>
            </div>
          </div>
        </div>
      </GridItem>
  );
};

export default DashboardWidget;