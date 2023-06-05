import { useCallback, useMemo, useRef, useState } from 'react';
import Popover from '@mui/material/Popover';
import { DateRangePicker } from 'react-date-range';
import { format, parseISO, startOfDay, endOfDay, addDays, addMonths, isSameDay, startOfMonth, endOfMonth, startOfYear, endOfYear, addYears } from 'date-fns';
import Icon from '../../utils/Icon';
import { __ } from '@wordpress/i18n';
import { useDate } from '../../store/useDateStore';

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
const currentUnixWithOffsets = currentUnix + (burst_settings.gmt_offset * 3600) - clientTimezoneOffsetSeconds;

// get current date by currentUnixWithOffsets
const currentDateWithOffset = new Date(currentUnixWithOffsets * 1000);

function isSelected(range) {
  const definedRange = this.range();
  return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
  );
}

const availableRanges = {
  'today': {
    label: __('Today', 'burst-statistics' ),
    range: () => ({
      startDate: startOfDay(currentDateWithOffset),
      endDate: endOfDay(currentDateWithOffset)
    })
  },
  'yesterday': {
    label: __('Yesterday', 'burst-statistics'),
    range: () => ({
      startDate: startOfDay(addDays(currentDateWithOffset, -1)),
      endDate: endOfDay(addDays(currentDateWithOffset, -1))
    })
  },
  'last-7-days': {
    label: __('Last 7 days', 'burst-statistics'),
    range: () => ({
      startDate: startOfDay(addDays(currentDateWithOffset, -7)),
      endDate: endOfDay(addDays(currentDateWithOffset, -1))
    })
  },
  'last-30-days': {
    label: __('Last 30 days', 'burst-statistics' ),
    range: () => ({
      startDate: startOfDay(addDays(currentDateWithOffset, -30)),
      endDate: endOfDay(addDays(currentDateWithOffset, -1))
    })
  },
  'last-90-days': {
    label: __('Last 90 days', 'burst-statistics'),
    range: () => ({
      startDate: startOfDay(addDays(currentDateWithOffset, -90)),
      endDate: endOfDay(addDays(currentDateWithOffset, -1))
    })
  },
  'last-month': {
    label: __('Last month', 'burst-statistics' ),
    range: () => ({
      startDate: startOfMonth(addMonths(currentDateWithOffset, -1)),
      endDate: endOfMonth(addMonths(currentDateWithOffset, -1))
    })
  },
  'year-to-date': {
    label: __('Year to date', 'burst-statistics' ),
    range: () => ({
      startDate: startOfYear(currentDateWithOffset),
      endDate: endOfDay(currentDateWithOffset)
    })
  },
  'last-year': {
    label: __('Last year', 'burst-statistics' ),
    range: () => ({
      startDate: startOfYear(addYears(currentDateWithOffset, -1)),
      endDate: endOfYear(addYears(currentDateWithOffset, -1))
    })
  },
}

const DateRange = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const startDate = useDate((state) => state.startDate);
  const endDate = useDate((state) => state.endDate);
  const setStartDate = useDate((state) => state.setStartDate);
  const setEndDate = useDate((state) => state.setEndDate);
  const range = useDate((state) => state.range);
  const setRange = useDate((state) => state.setRange);

  const [selectionRangeStartDate, setSelectionRangeStartDate] = useState(parseISO(startDate));
  const [selectionRangeEndDate, setSelectionRangeEndDate] = useState(parseISO(endDate));

  const countClicks = useRef(0);

  // select date ranges from settings
  const selectedRanges = burst_settings.date_ranges;

  // for all selected ranges add daterange and isSelected function
  const dateRanges = useMemo(() => {
    return Object.values(selectedRanges).filter(Boolean).map((value) => {
      const range = availableRanges[value];
      range.isSelected = isSelected;
      return range;
    });
  }, [selectedRanges]);

  const handleClick = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const updateDateRange = useCallback((ranges) => {
    countClicks.current++;

    const {startDate, endDate} = ranges.selection;
    const startStr = format(startDate, 'yyyy-MM-dd');
    const endStr = format(endDate, 'yyyy-MM-dd');

    setSelectionRangeStartDate(parseISO(startStr));
    setSelectionRangeEndDate(parseISO(endStr));

    const selectedRangeKey = Object.keys(availableRanges).find(key =>
        availableRanges[key].isSelected(ranges.selection)
    );
    const range = selectedRangeKey || 'custom';

    const isSecondClick = countClicks.current === 2;
    const isRange = range !== 'custom';
    const isTwoDifferentDates = startStr !== endStr;

    if (isSecondClick || isRange || isTwoDifferentDates) {
      countClicks.current = 0;
      setStartDate(startStr);
      setEndDate(endStr);
      setRange(range);
      handleClose();
    }
  }, [setStartDate, setEndDate, setRange, handleClose]);


  const formatString = 'MMMM d, yyyy';
  const display = {
    startDate: startDate ? format(new Date(startDate), formatString) : format(defaultStart, formatString),
    endDate: endDate ? format(new Date(endDate), formatString) : format(defaultEnd, formatString),
  }
  const selectionRange = {
    startDate:  selectionRangeStartDate,
    endDate: selectionRangeEndDate,
    key: 'selection',
  };
  return (
      <div className="burst-date-range-container">
        <button onClick={handleClick} id="burst-date-range-picker-open-button">
          <Icon name='calendar' size={'18'} />

          {range === 'custom' && display.startDate +  ' - ' +  display.endDate}
          {range !== 'custom' && availableRanges[range].label}
          <Icon name='chevron-down' />
        </button>
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={handleClose}
            className="burst"
        >
          <div id="burst-date-range-picker-container">
            <DateRangePicker
                ranges={[selectionRange]}
                rangeColors={['var(--rsp-brand-primary)']}
                dateDisplayFormat={formatString}
                monthDisplayFormat="MMMM"
                // color="var(--rsp-text-color)"
                onChange={(ranges) => {updateDateRange(ranges)}}
                inputRanges={[]}
                showSelectionPreview={true}
                // moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
                minDate={new Date(2022, 0, 1)}
                maxDate={ currentDateWithOffset }
                staticRanges={dateRanges}
            />
          </div>
        </Popover>
      </div>
  );

}

export default DateRange;