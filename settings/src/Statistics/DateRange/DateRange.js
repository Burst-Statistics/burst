import {
    render,
    Component,
    useState,
    useRef,
} from '@wordpress/element';
import {Popover} from '@mui/material';

// date range picker and date fns
import { DateRangePicker } from 'react-date-range';
import {format, parseISO} from 'date-fns'
import Icon from '../../utils/Icon';
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
    let countClicks = useRef(0);

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

        if ( countClicks.current === 2 || startStr !== endStr ) {
            countClicks.current = 0;
            props.setDateRange(ranges.selection)
            handleClose();
        }

    }
    const updateInsightsMetrics = (e) => {

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
                    />
                </div>
            </Popover>
        </div>
    );

}

export default DateRange;