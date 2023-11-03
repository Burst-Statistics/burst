import { __ } from '@wordpress/i18n';
import { useRef, useState, useCallback } from 'react';
import Icon from '../../utils/Icon';
import { Button } from '@wordpress/components';
import Popover from '@mui/material/Popover';
import { useInsightsStore } from '../../store/useInsightsStore';

const InsightsHeader = ({ metrics, filters }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const getMetrics = useInsightsStore((state) => state.getMetrics());
  const setMetrics = useInsightsStore((state) => state.setMetrics);
  const [pendingMetrics, setPendingMetrics] = useState(metrics);

  let metricLabels = {
    visitors: __('Unique visitors', 'burst-statistics'),
    pageviews: __('Pageviews', 'burst-statistics'),
    bounces: __('Bounces', 'burst-statistics'),
    sessions: __('Sessions', 'burst-statistics'),
  };
  const open = Boolean(anchorEl);
  if (filters.goal_id > 0) {
    // add conversion to metric
    metricLabels.conversions = __('Conversions', 'burst-statistics');
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    // save metrics
    setMetrics(pendingMetrics);
    e.preventDefault();
    setAnchorEl(null);
  };

  const handleCheckboxChange = useCallback((event) => {
    const metric = event.target.value;
    const isChecked = event.target.checked;
    setPendingMetrics((prevPendingMetrics) => {
      if (isChecked) {
        return [...prevPendingMetrics, metric];
      } else {
        return prevPendingMetrics.filter((pendingMetric) => pendingMetric !== metric);
      }
    });
  }, []);

  return (
      <div>
        <Button
            id="burst-filter-button"
            className={`burst-filter-button${open ? ' active' : ''}`}
            aria-controls="burst-filter-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
          <Icon name="filter" />
        </Button>
        <Popover
            id="burst-filter-menu"
            className="burst burst-filter-menu"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
        >
          <h4>{__('Select metrics', 'burst-statistics')}</h4>
          {Object.keys(metricLabels).map((metric) => (
              <div className="burst-filter-dropdown-content-body-item" key={metric}>
                <label>
                  <input
                      type="checkbox"
                      value={metric}
                      checked={pendingMetrics.includes(metric)}
                      onChange={handleCheckboxChange}
                  />
                  {metricLabels[metric]}
                </label>
              </div>
          ))}
          <input type="hidden" name="burst-metrics" value={metrics} />
          <Button onClick={handleClose} className="burst-button burst-button--secondary">
            {__('Apply', 'burst-statistics')}
          </Button>
        </Popover>
      </div>
  );
};

export default InsightsHeader;