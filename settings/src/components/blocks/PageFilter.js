import {useFiltersStore} from '../../store/useFiltersStore';
import Icon from '../../utils/Icon';
import {__} from '@wordpress/i18n';
import {useGoals} from '../../store/useGoalsStore';
import { useInsightsStore } from '../../store/useInsightsStore';

export const PageFilter = () => {
  const filters = useFiltersStore((state) => state.filters);
  const filtersConf = useFiltersStore((state) => state.filtersConf);
  const setFilters = useFiltersStore((state) => state.setFilters);
  const goalFields = useGoals((state) => state.goalFields);
  const animate = useFiltersStore((state) => state.animate);
  const setInsightsMetrics = useInsightsStore((state) => state.setMetrics);
  const insightsMetrics = useInsightsStore((state) => state.metrics);
  let title = '';


  const getGoalsTitle = (id) => {
    if (!goalFields[id]) {
      return '';
    }
    return goalFields[id].goal_title.value;
  }

  // if animate is set, add the class to the filter
  const getFilterClass = (filter) => {
    let className = 'burst-data-filter';
    if (animate === filter) {
      className += ' burst-data-filter--animate';
    }
    return className;
  }

  const removeFilter = (filter) => {
    setFilters(filter, '')

    if (filter === 'goal_id') {
      console.log('unset goal_id');
      // also remove insight metrics conversions
      setInsightsMetrics(insightsMetrics.filter((metric) => metric !== 'conversions'));
    }
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
            const icon = filtersConf[filter].icon !== '' ? filtersConf[filter].icon : 'filter';
            return (
                <div className={getFilterClass(filter)} key={index}>
                  <Icon name={filtersConf[filter].icon} size="16"/>
                  <p className={"burst-data-filter__label"}>{filtersConf[filter].label}</p>
                  <span className={"burst-data-filter-divider"}></span>
                  <p className={"burst-data-filter__value"}>{title}</p>
                  <button onClick={() => removeFilter(filter)}><Icon name="times" color={'var(--rsp-grey-500)'} size="16"/></button>
                </div>
            );
          }
        }
        )}
      </>
  );
};