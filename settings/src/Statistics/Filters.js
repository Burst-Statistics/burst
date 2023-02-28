import DateRange from './DateRange';
import {PageFilter} from './PageFilter';

export const Filters = () => {
  return (
  <div className="burst-data-filters">
    <PageFilter />
    <DateRange />
  </div>
  )
}