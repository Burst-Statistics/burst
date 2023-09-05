import {__} from '@wordpress/i18n';
import {getData} from '../utils/api';
import {
  formatNumber, formatTime,
  getBouncePercentage,
  getChangePercentage, getPercentage,
} from '../utils/formatting';

const deviceNames = {
  'desktop': __('Desktop', 'burst-statistics'),
  'tablet': __('Tablet', 'burst-statistics'),
  'mobile': __('Mobile', 'burst-statistics'),
  'other': __('Other', 'burst-statistics'),
};

export const transformDevicesData = (response) => {
  let data = {};
  for (const [key, value] of Object.entries(deviceNames)) {
    let os = response[key].os ? response[key].os : '-';
    let browser = response[key].browser ? response[key].browser : 'unknown';

    Object.assign(data, {
      [key]: {
        'title': value,
        'subtitle': os + ' / ' + browser,
        'value': getPercentage(response[key].count, response['all'].count),
      },
    });
  }
  return data;
}

/**
 * Get live visitors
 * @param {Object} args
 * @param {string} args.startDate
 * @param {string} args.endDate
 * @param {string} args.range
 * @param {Object} args.filters
 * @returns {Promise<*>}
 */
const getDevicesData = async ({ startDate, endDate, range, args } ) => {
  const { data } = await getData(
      'devices',
      startDate,
      endDate,
      range,
      args
  );
  return transformDevicesData(data);

}
export default getDevicesData;

