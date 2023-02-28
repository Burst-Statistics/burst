import React from 'react'
import {useFilters} from '../data/statistics/filters';
import Tooltip from '@mui/material/Tooltip';
import {__} from '@wordpress/i18n';

const ClickToFilter = (props) => {
  if (!props.filter || !props.filterValue) {
    return <>{props.children}</>
  }
  const {setFilters} = useFilters();
  const tooltip = props.label ? __('Click to filter by:', 'burst-statistics') + ' ' + props.label : __('Click to filter', 'burst-statistics');

  const handleClick = () => {
    setFilters(props.filter, props.filterValue);
    // redirect to statistics page.  change to '#statistics'
    window.location.href = '#statistics';
  }

  return (
      <Tooltip title={tooltip}>
        <span onClick={handleClick} className="burst-click-to-filter">
          {props.children}
        </span>
      </Tooltip>
  )
}

export default ClickToFilter