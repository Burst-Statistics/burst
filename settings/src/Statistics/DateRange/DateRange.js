import {
    render,
    Component,
    useState,
    useRef,
} from '@wordpress/element';
import {Popover} from '@mui/material';

// date range picker and date fns
import { DateRangePicker } from 'react-date-range';
import {format, parseISO, startOfYear, addDays, addMonths, isSameDay, startOfDay, endOfDay, startOfMonth, endOfMonth} from 'date-fns'
import Icon from '../../utils/Icon';
import {__} from '@wordpress/i18n';
import {useEffect} from 'react';

const DateRange = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectionRange, setSelectionRange] = useState({
            startDate:  parseISO(props.dateRange.startDate),
            endDate: parseISO(props.dateRange.endDate),
            key: 'selection',
        }
    );
    const countClicks = useRef(0);
    // select date ranges from settings
    const selectedRanges = burst_settings.date_ranges;
    const availableRanges = {
        'today': {
            label: __('Today', 'burst-statistics' ),
            range: () => ({
                startDate: startOfDay(new Date()),
                endDate: endOfDay(new Date())
            })
        },
        'yesterday': {
            label: __('Yesterday', 'burst-statistics'),
            range: () => ({
                startDate: startOfDay(addDays(new Date(), -1)),
                endDate: endOfDay(addDays(new Date(), -1))
            })
        },
        'last-7-days': {
            label: __('Last 7 days', 'burst-statistics'),
            range: () => ({
                startDate: startOfDay(addDays(new Date(), -7)),
                endDate: endOfDay(addDays(new Date(), -1))
            })
        },
        'last-30-days': {
            label: __('Last 30 days', 'burst-statistics' ),
            range: () => ({
                startDate: startOfDay(addDays(new Date(), -30)),
                endDate: endOfDay(addDays(new Date(), -1))
            })
        },
        'last-90-days': {
            label: __('Last 90 days', 'burst-statistics'),
            range: () => ({
                startDate: startOfDay(addDays(new Date(), -90)),
                endDate: endOfDay(addDays(new Date(), -1))
            })
        },
        'last-month': {
            label: __('Last month', 'burst-statistics' ),
            range: () => ({
                startDate: startOfMonth(addMonths(new Date(), -1)),
                endDate: endOfMonth(addMonths(new Date(), -1))
            })
        },
        'year-to-date': {
            label: __('Year to date', 'burst-statistics' ),
            range: () => ({
                startDate: startOfYear(new Date()),
                endDate: endOfDay(new Date())
            })
        },
    }
    function isSelected(range) {
        const definedRange = this.range();
        return (
            isSameDay(range.startDate, definedRange.startDate) &&
            isSameDay(range.endDate, definedRange.endDate)
        );
    }

    // for all selected ranges add daterange and isSelected function
    const dateRanges = [];
    for (const [key, value] of Object.entries(selectedRanges)) {
        if (value) {
            dateRanges.push(availableRanges[value]);
            dateRanges[dateRanges.length - 1].isSelected = isSelected;
        }
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
    };


    const updateDateRange = (ranges) => {
        countClicks.current++
        setSelectionRange(ranges.selection);
        let startStr = format(ranges.selection.startDate, 'yyyy-MM-dd');
        let endStr = format(ranges.selection.endDate, 'yyyy-MM-dd');
        let range = 'custom';

        // loop through availableRanges and check if the selected range is one of them
        for (const [key, value] of Object.entries(availableRanges)) {
            if (value.isSelected(ranges.selection)) {
                range = key;
            }
        }
        let dateRange = {
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate,
            range: range
        }

        if ( countClicks.current === 2 || startStr !== endStr || range !== 'custom' ) {
            countClicks.current = 0;
            props.setDateRange(dateRange)
            handleClose();
        }

    }

    const formatString = 'MMMM d, yyyy';
    const display = {
        startDate: props.dateRange.startDate ? format(new Date(props.dateRange.startDate), formatString) : format(defaultStart, formatString),
        endDate: props.dateRange.endDate ? format(new Date(props.dateRange.endDate), formatString) : format(defaultEnd, formatString),
    }
    return (
        <div className="burst-date-range-container">
            <button onClick={handleClick} id="burst-date-range-picker-open-button" className="button button-input" >
                <Icon name='calendar' /> 
                {display.startDate} - {display.endDate}
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
                        maxDate={ new Date() }
                       staticRanges={dateRanges}
                    />
                </div>
            </Popover>
        </div>
    );

}

export default DateRange;