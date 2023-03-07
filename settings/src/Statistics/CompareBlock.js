import Icon from '../utils/Icon';
import {useEffect, useRef} from 'react';
import {useCompareStats} from '../data/statistics/compare';
import {useFilters} from '../data/statistics/filters';
import {useDate} from '../data/statistics/date';

const CompareBlock = (props) => {
  const {data, loading, fetchCompareData} = useCompareStats();
  const {filters} = useFilters();
  const {startDate, endDate, range} = useDate();

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    let args = {
      filters: filters,
    };
    fetchCompareData(startDate, endDate, range, args);
  }, [startDate, endDate, range, filters]);

  let loadingClass = loading ? 'burst-loading' : '';
  return (
      <>
        <div className={'burst-loading-container ' + loadingClass}>
          {Object.keys(data).map((key, i) => {
            let m = data[key];
            return <div className="block__explanation-and-stats" key={i}>
              <Icon name={key}/>
              <div className="block__explanation-and-stats__left">
                <h3 className="burst-h5">{m.title}</h3>
                <p>{m.subtitle}</p>
              </div>
              <div className="block__explanation-and-stats__right">
                <span className="burst-h4">{m.value}</span>
                <p className={'uplift ' + m.changeStatus}>
                  {m.change}
                </p>
              </div>
            </div>;
          })}
        </div>
      </>
  );
};

export default CompareBlock;

