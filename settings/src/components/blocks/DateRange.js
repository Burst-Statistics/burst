import {useCallback, useMemo, useRef, useState} from 'react';
import Popover from '@mui/material/Popover';
import {DateRangePicker} from 'react-date-range';
import {format, parseISO} from 'date-fns';
import Icon from '../../utils/Icon';
import {useDate} from '../../store/useDateStore';
import {
  getDateWithOffset,
  getAvailableRanges,
  getDisplayDates,
  availableRanges
} from '../../utils/formatting';
import ErrorBoundary from '../ErrorBoundary';

const DateRange = () => {
  const [ anchorEl, setAnchorEl ] = useState( null );
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setRange,
    range
  } = useDate();
  const [ selectionRangeStartDate, setSelectionRangeStartDate ] = useState(
      parseISO( startDate ) );
  const [ selectionRangeEndDate, setSelectionRangeEndDate ] = useState(
      parseISO( endDate ) );
  const countClicks = useRef( 0 );
  const selectedRanges = burst_settings.date_ranges;
  const dateRanges = useMemo( () => getAvailableRanges( selectedRanges ),
      [ selectedRanges ]);
  const display = getDisplayDates( startDate, endDate );

  const handleClick = useCallback( ( e ) => {
    setAnchorEl( e.currentTarget );
  }, []);

  const handleClose = useCallback( () => {
    countClicks.current = 0; // reset click count
    setAnchorEl( null );
  }, []);

  const updateDateRange = useCallback( ( ranges ) => {
    countClicks.current++;

    const {startDate, endDate} = ranges.selection;
    const startStr = format( startDate, 'yyyy-MM-dd' );
    const endStr = format( endDate, 'yyyy-MM-dd' );

    const selectedRangeKey = Object.keys( availableRanges ).find( key =>
        availableRanges[key].isSelected( ranges.selection )
    );
    const range = selectedRangeKey || 'custom';

    const isSecondClick = 2 === countClicks.current;
    const isRange = 'custom' !== range;
    const isTwoDifferentDates = startStr !== endStr;

    setSelectionRangeStartDate( startDate );
    setSelectionRangeEndDate( endDate );

    if ( isSecondClick || isRange || isTwoDifferentDates ) {
      setStartDate( startStr );
      setEndDate( endStr );
      setRange( range );
      handleClose();
    }
  }, [ setStartDate, setEndDate, setRange, handleClose ]);

  const selectionRange = {
    startDate: selectionRangeStartDate,
    endDate: selectionRangeEndDate,
    key: 'selection'
  };

  return (
      <div className="burst-date-range-container">
        <button onClick={handleClick} id="burst-date-range-picker-open-button">
          <Icon name="calendar" size={'18'}/>
          {'custom' === range && display.startDate + ' - ' + display.endDate}
          {'custom' !== range && availableRanges[range].label}
          <Icon name="chevron-down"/>
        </button>
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={Boolean( anchorEl )}
            onClose={handleClose}
            className="burst"
        >
          <div id="burst-date-range-picker-container">
            <ErrorBoundary fallback={'Could not load date picker'}>
              <DateRangePicker
                  ranges={[ selectionRange ]}
                  rangeColors={[ 'var(--rsp-brand-primary)' ]}
                  dateDisplayFormat={'dd MMMM yyyy'}
                  monthDisplayFormat="MMMM"

                  // color="var(--rsp-text-color)"
                  onChange={( ranges ) => {
                    updateDateRange( ranges );
                  }}
                  inputRanges={[]}
                  showSelectionPreview={true}

                  // moveRangeOnFirstSelection={false}
                  months={2}
                  direction="horizontal"
                  minDate={new Date( 2022, 0, 1 )}
                  maxDate={getDateWithOffset()}
                  staticRanges={dateRanges}
              />
            </ErrorBoundary>
          </div>
        </Popover>
      </div>
  );

};

export default DateRange;
