import {__} from '@wordpress/i18n';
import {
  useState,
} from 'react';

import useNotices from '../../store/useNoticesStore';

const ProgressHeader = (props) => {
  const setFilter = useNotices((state) => state.setFilter);
  const filter = useNotices((state) => state.filter);
  const notices = useNotices((state) => state.notices);
  const filteredNotices = useNotices((state) => state.filteredNotices);

  let count = {'all': 0, 'remaining': 0};

  // count all tasks
  count.all = notices.length;
  // count remaining tasks
  count.remaining = filteredNotices.length;


  const onClickHandler = (e) => {
    let filter = e.target.getAttribute('data-filter');
    if (filter === 'all' || filter === 'remaining') {
      setFilter(filter);
    }
  }

  return (
      <div className={'burst-task-switcher-container burst-active-filter-' +
          filter}>
        <span className="burst-task-switcher burst-all-tasks"
              onClick={onClickHandler} htmlFor="burst-all-tasks"
              data-filter="all">
                {__('All tasks', 'burst-statistics')}
          <span className="burst_task_count">({count.all})</span>
        </span>
        <span className="burst-task-switcher burst-remaining-tasks"
              onClick={onClickHandler} htmlFor="burst-remaining-tasks"
              data-filter="remaining">
                        {__('Remaining tasks', 'burst-statistics')}
          <span className="burst_task_count">({count.remaining})</span>
        </span>
      </div>
  );
};
export default ProgressHeader;
