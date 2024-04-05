import { getData } from '../utils/api';
import {
  formatPercentage,
  formatTime,
  getCountryName
} from '../utils/formatting';
import { __ } from '@wordpress/i18n';
import ClickToFilter from '../components/blocks/ClickToFilter';
import Flag from '../components/blocks/Flag';

export const transformDataTableData = ( response, columnOptions ) => {

  // Update columns
  response.columns = response.columns.map( ( column ) => {
    const format = columnOptions[column.id]?.format || 'integer';
    const updatedColumn = {
      ...column,
      selector: ( row ) => row[column.id],
      right: 'left' !== columnOptions[column.id]?.align
    };

    // add sort function if percentage or time or integer
    if ( 'percentage' === format || 'time' === format || 'integer' === format ) {
      updatedColumn.sortFunction = ( rowA, rowB ) => {
        const numA = parseFloat( rowA[column.id]);
        const numB = parseFloat( rowB[column.id]);
        return numA - numB;
      };
    }

    // Define a cell rendering function based on the format
    const formatCell = ( value, row ) => {
      switch ( format ) {
        case 'percentage':
          return formatPercentage( value );
        case 'time':
          return formatTime( value );
        case 'country':
          return (
              <ClickToFilter filter={column.id} filterValue={value}>
                <Flag country={value} countryNiceName={getCountryName( value )} />
              </ClickToFilter>
          );
        case 'url':
          return (
              <ClickToFilter filter={column.id} filterValue={value}>
                {decodeURI( value )}
              </ClickToFilter>
          );
        case 'text':
          return value;
        case 'integer':
          return parseInt( value, 10 );
        default:
          return value;
      }
    };

    updatedColumn.cell = ( row ) => formatCell( row[column.id], row );

    return updatedColumn;
  });

  return response;
};

const getDataTableData = async({
  startDate,
  endDate,
  range,
  args,
  columnsOptions
}) => {
  try {
    const { data } = await getData( 'datatable', startDate, endDate, range, args );
    return transformDataTableData( data, columnsOptions );
  } catch ( error ) {
    console.error( 'Error fetching data table data:', error );
  }
};

export default getDataTableData;
