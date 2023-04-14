import React from 'react';
import {useFiltersStore} from '../../store/useFiltersStore';
import {useGoalFieldsStore} from '../../store/useGoalFieldsStore';
import {useInsightsStore} from '../../store/useInsightsStore';
import {useDate} from '../../store/useDateStore';
import Tooltip from '@mui/material/Tooltip';
import {__} from '@wordpress/i18n';
import {toast} from 'react-toastify';
import {endOfDay, format, subDays} from 'date-fns';
import {formatUnixToDate} from '../../utils/formatting';

const ClickToFilter = ({
  filter,
  filterValue,
  label,
  children,
  startDate,
  endDate,
}) => {
  if (!filter || !filterValue) {
    return <>{children}</>;
  }
  const setFilters = useFiltersStore((state) => state.setFilters);
  const setAnimate = useFiltersStore((state) => state.setAnimate);
  const goalFields = useGoalFieldsStore((state) => state.goalFields);
  const setInsightsMetrics = useInsightsStore(
      (state) => state.setMetrics);
  const insightsMetrics = useInsightsStore((state) => state.metrics);
  const setStartDate = useDate((state) => state.setStartDate);
  const setEndDate = useDate((state) => state.setEndDate);
  const setRange = useDate((state) => state.setRange);
  const tooltip = label
      ? __('Click to filter by:', 'burst-statistics') + ' ' + label
      : __('Click to filter', 'burst-statistics');

  const animateElement = async (event) => {
    const element = document.querySelector('.burst-data-filter--animate');
    const styles = window.getComputedStyle(element);
    const parentOffsetX = element.offsetParent
        ? element.offsetParent.offsetLeft
        : 0;
    const parentOffsetY = element.offsetParent
        ? element.offsetParent.offsetTop
        : 0;
    const marginLeft = parseInt(styles.marginLeft);
    const marginTop = parseInt(styles.marginTop);
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    const x = event.clientX - elementWidth + window.scrollX - parentOffsetX -
        marginLeft;
    const y = event.clientY - (elementHeight * 4) + window.scrollY -
        parentOffsetY - marginTop;
    element.style.transformOrigin = '50% 50%';
    element.style.opacity = 0;
    element.style.transform = `translateX(${x}px) translateY(${y}px)`;

    await new Promise(resolve => setTimeout(resolve, 50));

    element.style.transition = 'transform 0.2s ease, opacity 0.2s ease-out';
    element.style.transform = `translateX(${x}px) translateY(${y}px) scale(1)`;
    element.style.opacity = 1;

    element.style.transition = 'transform 0.5s ease-in-out, opacity 0.2s ease-out';
    element.style.transform = 'translateX(0) translateY(0)';
  };

  const handleClick = async (event) => {
    window.location.href = '#statistics';

    if (filter === 'goal_id') {
      // @todo get goal setup
      if (goalFields[filterValue] &&
          goalFields[filterValue].goal_specific_page &&
          goalFields[filterValue].goal_specific_page.value) {
        setFilters('page_url',
            goalFields[filterValue].goal_specific_page.value);
        setFilters(filter, filterValue);
        toast.info(
            __('Filtering by goal & goal specific page', 'burst-statistics'));
      }
      else {
        setFilters(filter, filterValue);
        toast.info(__('Filtering by goal', 'burst-statistics'));
      }
      if (!insightsMetrics.includes('conversions')) {
        // Add 'conversions' to the array and update the state
        setInsightsMetrics([...insightsMetrics, 'conversions']);
      }

      // add 'conversions' to insightMetrics

    }
    else {
      setFilters(filter, '');

      await new Promise((resolve) => setTimeout(resolve, 10));
      setFilters(filter, filterValue, true);
      await animateElement(event);

      setAnimate(false);
    }

    const MIN_START_DATE = 1640995200; // January 1, 2022 in Unix timestamp format

    let selectedStartDate;
    if (startDate && (typeof startDate === 'number' || Date.parse(startDate) >= MIN_START_DATE * 1000)) {
      selectedStartDate = typeof startDate === 'number' ? formatUnixToDate(startDate) : startDate;
    }

    if (selectedStartDate) {
      const selectedEndDate = endDate ? (endDate > 0 ? formatUnixToDate(endDate) : endDate) : format(new Date(), 'yyyy-MM-dd');
      setStartDate(selectedStartDate);
      setEndDate(selectedEndDate);
      setRange('custom');
    }

  };

  return (
      <Tooltip title={tooltip}>
      <span onClick={handleClick} className="burst-click-to-filter">
        {children}
      </span>
      </Tooltip>
  );
};

export default ClickToFilter;
