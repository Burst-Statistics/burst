import {
  useState,
  useEffect,
} from 'react';

import TaskElement from './TaskElement';
import {__} from '@wordpress/i18n';
import useNotices from '../../store/useNoticesStore';
import GridItem from '../common/GridItem';
import ProgressHeader from './ProgressHeader';
import ProgressFooter from './ProgressFooter';

const ProgressBlock = (props) => {
  const loading = useNotices((state) => state.loading);
  const filter = useNotices((state) => state.filter);
  const notices = useNotices((state) => state.notices);
  const getNotices = useNotices((state) => state.getNotices);
  const filteredNotices = useNotices((state) => state.filteredNotices);
  const setFilter = useNotices((state) => state.setFilter);
  const dismissNotice = useNotices((state) => state.dismissNotice);

  useEffect(() => {
    getNotices();
  }, []);

  const displayNotices = filter === 'remaining' ? filteredNotices : notices;

  return (
      <GridItem
          className={'burst-column-2 burst-progress'}
          title={__('Progress', 'burst-statistics')}
          controls={<ProgressHeader/>}
          footer={<ProgressFooter/>}
      >
        <div className="burst-progress-block">
          <div className="burst-scroll-container">
            {loading && <div className="burst-task-element">
                            <span
                                className={'burst-task-status burst-loading'}>{__(
                                'Loading...', 'burst-statistics')}</span>
              <p className="burst-task-message">{__(
                  'Loading notices...', 'burst-statistics')}</p>
            </div>}
            {!loading && displayNotices.map(
                (notice, i) => <TaskElement key={i} index={i} notice={notice}
                                            onCloseTaskHandler={() => dismissNotice(
                                                notice.id)}
                                            highLightField={props.highLightField}/>,
            )}
          </div>
        </div>
      </GridItem>
  );
};

export default ProgressBlock;