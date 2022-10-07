import {
    render,
    Component,
    useState
} from '@wordpress/element';

// date range picker and date fns
import { DateRangePicker } from 'react-date-range';
import {format, parseISO} from 'date-fns'
import Icon from '../../utils/Icon';

const DateRange = (props) => {
    const dateRange = props.dateRange;
    const setDateRange = props.setDateRange;


    const [isOpen, setIsOpen] = useState(false);
    const updateDateRange = (ranges) => {
        // @todo only run on actual change of both values
        props.setDateRange(ranges.selection);
        setIsOpen(!isOpen)
    }
    const selectionRange = {
        startDate:  parseISO(dateRange.startDate),
        endDate: parseISO(dateRange.endDate),
        key: 'selection',
    }

    const display = {
        startDate: dateRange.startDate ? format(new Date(dateRange.startDate), 'dd-MM-yyyy') : format(defaultStart, 'dd-MM-yyyy'),
        endDate: dateRange.endDate ? format(new Date(dateRange.endDate), 'dd-MM-yyyy') : format(defaultEnd, 'dd-MM-yyyy'),
    }
    return (
        <div className="burst-date-range-container">
            <button onClick={() => setIsOpen(!isOpen)} id="burst-date-range-picker-open-button" className="button button-input" >
                <Icon name='calendar' /> 
                {display.startDate} - {display.endDate}
                <Icon name='chevron-down' />
            </button>
            <div id="burst-date-range-picker-container" className={isOpen ? 'burst-date-range-picker-open' : '' }>
                <DateRangePicker
                    ranges={[selectionRange]}
                    rangeColors={['var(--rsp-brand-primary)']}
                    dateDisplayFormat="dd-MM-yyyy"
                    monthDisplayFormat="MMMM"
                    // color="var(--rsp-text-color)"
                    onChange={(ranges) => updateDateRange(ranges)}
                    inputRanges={[]}
                    showSelectionPreview={true}
                    // moveRangeOnFirstSelection={false}
                    months={2}
                    direction="horizontal"
                    minDate={new Date(2022, 0, 1)}
                    maxDate={ new Date() }
                />
            </div>
        </div>
    );

}

export default DateRange;