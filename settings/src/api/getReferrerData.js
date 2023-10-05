import {__} from '@wordpress/i18n';
import {getData} from '../utils/api';

export const transformReferrersData = (response) => {
  response.columns[0].selector = row => row.referrer; // select data for referrer column
  response.columns[1].selector = row => row.count; // select data for count column
  // foreach data convert to int
  response.data.forEach((row, index) => {
    row.count = parseInt(row.count);
  });

  return response;
}

const getReferrerData = async ({startDate, endDate, range, args}) => {
  const { data } = await getData(
      'referrers',
      startDate,
      endDate,
      range,
      args
  );

  return transformReferrersData(data);
}
export default getReferrerData;