import {__} from '@wordpress/i18n';
import {getData} from '../utils/api';

export const transformPagesData = (response) => {
  const metrics = response.metrics;
  // Update columns
  response.columns = response.columns.map((column, index) => {
    if (index > 0) {
      return {
        ...column,
        selector: (row) => row[column.id],
      };
    } else {
      return {
        ...column,
      };
    }
  });

  // Convert metric values to integers
  response.data.forEach((row, index) => {
    for (let key in metrics) {
      response.data[index][metrics[key]] = parseInt(row[metrics[key]]);
    }
  });

  if (metrics[1] === 'conversions') {
    response.columns[1].name = __('Conversions', 'burst-statistics');
  }

  return response;
};

const getPagesData = async ({startDate, endDate, range, args}) => {
  const { data } = await getData(
      'pages',
      startDate,
      endDate,
      range,
      args
  );
  return transformPagesData(data);
}
export default getPagesData;