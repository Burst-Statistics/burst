import {__} from '@wordpress/i18n';
import {getData} from '../utils/api';
import {formatPercentage, formatTime} from '../utils/formatting';

export const transformPagesData = (response, columnOptions) => {
  const metrics = response.metrics;
  // Update columns
  response.columns = response.columns.map((column, index) => {
    const updatedColumn = {...column};

    if (index > 0) {
      updatedColumn.selector = (row) => row[column.id];
    }

    // Apply custom sort function to percentage columns
    if (columnOptions[column.id]?.format === 'percentage') {
      updatedColumn.sortFunction = (rowA, rowB) => {
        const numA = parseFloat(rowA[column.id]);
        const numB = parseFloat(rowB[column.id]);
        return numA - numB;
      };
    }

    return updatedColumn;
  });

  // Convert metric values to integers
  response.data.forEach((row, index) => {
    for (let key in metrics) {
      // check if the format in the columns is percentage
      if (columnOptions[metrics[key]].format === 'percentage') {
        response.data[index][metrics[key]] = formatPercentage(
            row[metrics[key]]);
        continue;
      }
      if (columnOptions[metrics[key]].format === 'time') {
        response.data[index][metrics[key]] = formatTime(row[metrics[key]]);
        continue;
      }
      response.data[index][metrics[key]] = parseInt(row[metrics[key]]);
    }
  });

  if (metrics[1] === 'conversions') {
    response.columns[1].name = __('Conversions', 'burst-statistics');
  }

  return response;
};

const getPagesData = async ({
  startDate,
  endDate,
  range,
  args,
  columnsOptions,
}) => {
  const {data} = await getData(
      'pages',
      startDate,
      endDate,
      range,
      args,
  );
  return transformPagesData(data, columnsOptions);
};
export default getPagesData;