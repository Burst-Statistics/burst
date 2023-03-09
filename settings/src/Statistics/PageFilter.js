import {useFilters} from '../data/statistics/filters';
import Icon from '../utils/Icon';
import {__} from '@wordpress/i18n';
import {useGoals} from '../data/settings/goals';

export const PageFilter = () => {
  const filters = useFilters((state) => state.filters);
  const filtersConf = useFilters((state) => state.filtersConf);
  const setFilters = useFilters((state) => state.setFilters);
  const goalFields = useGoals((state) => state.goalFields);
  let title = '';


  const getGoalsTitle = (id) => {
    let title = '';
    return goalFields[id].goal_title.value;
  }



  // map through the filtersConf and get filters that are set
  return (
      <>
        {Object.keys(filtersConf).map((filter, index) => {
          if (filters[filter] !== '') {
            if (filter === 'goal_id') {
              title = getGoalsTitle(filters[filter]);
            } else {
              title = filters[filter];
            }
            return (
                <div className={'burst-data-filter'} key={index}>
                  <Icon name={filtersConf[filter].icon} size="18"/>
                  <p className={"burst-data-filter__label"}>{filtersConf[filter].label}</p>
                  <span className={"burst-data-filter-divider"}></span>
                  <p className={"burst-data-filter__value"}>{title}</p>
                  <button onClick={() => setFilters(filter, '')}><Icon name="times" color={'var(--rsp-grey-500)'} size="16"/></button>
                </div>
            );
          }
        }
        )}
      </>
  );
};