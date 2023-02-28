import {useFilters} from '../data/statistics/filters';
import Icon from '../utils/Icon';
import {__} from '@wordpress/i18n';

export const PageFilter = () => {
  const {filters, filtersConf, setFilters} = useFilters();

  // map through the filtersConf and get filters that are set
  return (
      <>
        {Object.keys(filtersConf).map((filter, index) => {
          if (filters[filter] !== '') {
            return (
                <div className={'burst-data-filter'} key={index}>
                  <Icon name={filtersConf[filter].icon} size="18"/>
                  <p className={"burst-data-filter__label"}>{filtersConf[filter].label}</p>
                  <span className={"burst-data-filter-divider"}></span>
                  <p className={"burst-data-filter__value"}>{filters[filter]}</p>
                  <button onClick={() => setFilters(filter, '')}><Icon name="times" color={'var(--rsp-grey-500)'} size="16"/></button>
                </div>
            );
          }
        }
        )}
      </>
  );
};