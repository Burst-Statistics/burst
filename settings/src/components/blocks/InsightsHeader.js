import { __ } from '@wordpress/i18n';
import {useInsightsStore} from '../../store/useInsightsStore';
import PopoverFilter from './PopoverFilter';

const InsightsHeader = ({selectedMetrics, filters}) => {
  const setMetrics = useInsightsStore((state) => state.setMetrics);

  const insightsOptions = {
    'pageviews': {
      'label': __('Pageviews', 'burst-statistics'),
      'default': true,
    },
    'visitors': {
      'label': __('Visitors', 'burst-statistics'),
      'default': true,
    },
    'sessions': {
      'label': __('Sessions', 'burst-statistics'),
    },
    'bounces': {
      'label': __('Bounces', 'burst-statistics'),
    },
  };

  if (filters.goal_id > 0) {
    insightsOptions['conversions'] = {
      'label': __('Conversions', 'burst-statistics'),
      'default': true,
    };
  }

  const onApply = (value) => {
    setMetrics(value);
  };

  return (
      <PopoverFilter
          selectedOptions={selectedMetrics}
          options={insightsOptions}
          onApply={onApply}
      />

  );
};

export default InsightsHeader;
