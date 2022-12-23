import {__} from '@wordpress/i18n';
import {
  useState,
} from 'react';

const ProgressHeader = (props) => {
  const [filter, setFilter] = useState('all');
  let all_task_count = 0;
  let open_task_count = 0;
  let notices = [];
  if (props.BlockProps && props.BlockProps.notices) {
    notices = props.BlockProps.notices;
    all_task_count = notices.length;
    let openNotices = notices.filter(function(notice) {
      return notice.output.status === 'open';
    });
    open_task_count = openNotices.length;
  }

  const onClickHandler = (e) => {
    let filter = e.target.getAttribute('data-filter');
    if (filter === 'all' || filter === 'remaining') {
      setFilter(filter);
      sessionStorage.burst_task_filter = filter;
      // @todo - update the task list
    }
  };

  return (
      <div className={'burst-task-switcher-container burst-active-filter-' +
          filter}>
        <span className="burst-task-switcher burst-all-tasks"
              onClick={onClickHandler} htmlFor="burst-all-tasks"
              data-filter="all">
                {__('All tasks', 'burst-statistics')}
          <span className="burst_task_count">({all_task_count})</span>
        </span>
        <span className="burst-task-switcher burst-remaining-tasks"
              onClick={onClickHandler} htmlFor="burst-remaining-tasks"
              data-filter="remaining">
                        {__('Remaining tasks', 'burst-statistics')}
          <span className="burst_task_count">({open_task_count})</span>
        </span>
      </div>
  );
};
export default ProgressHeader;
