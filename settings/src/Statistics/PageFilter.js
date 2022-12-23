import {UseFilter} from '../data/statistics/filters';
import Icon from '../utils/Icon';
import {__} from '@wordpress/i18n';

export const PageFilter = () => {
  const {pageId, setPageId} = UseFilter();

  const onClose = (e) => {
    console.log('onClose');
    setPageId('');
  }

  return (
      <>
        {pageId !== '' && <div className="burst-data-filter">
          <Icon name="page" size="18"/>
          <p className={"burst-data-filter__label"}>{__('Page', 'burst-statistics')}</p>
          <span className={"burst-data-filter-divider"}></span>
          <p className={"burst-data-filter__value"}>Titelnaam voor {pageId}</p>
          <button onClick={onClose}><Icon name="times" color={'var(--rsp-grey-500)'} size="16"/></button>
        </div>}
      </>
  );
};

