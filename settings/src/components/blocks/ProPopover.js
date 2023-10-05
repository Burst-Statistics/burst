import {useState} from 'react';
import * as Popover from '@radix-ui/react-popover';
import Icon from '../../utils/Icon';
import {__} from '@wordpress/i18n';

const ProPopover = ({
  children,
  className,
  onClick,
}) => {
  const [open, setOpen] = useState(false);
  const [firstHover, setFirstHover] = useState(true);
  // on first hover open popover
  const openInFirstHover = () => {
    if (firstHover) {
      setOpen(true);
      setFirstHover(false);
    }
  }
  return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger className={className} onMouseEnter={openInFirstHover} onClick={onClick}>
          {children}
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
              className={'burst burst-pro-popover'}
              align={'end'}
              sideOffset={10}
              arrowPadding={10}
          >
            <span className={'burst-pro-popover__arrow'}></span>
            <div className={'burst-pro-popover__header'}>
              <Popover.Close className={'burst-pro-popover__close'}><Icon name={'times'} /></Popover.Close>
              <h5>{__('Unlock Country Insights with Pro', 'burst-statistics')}</h5>
              <h6>{__('Get detailed information on your users', 'burst-statistics')}</h6>
            </div>
            <div className={'burst-pro-popover__bullet-list'} >
              <p className={'burst-small-text'}>{__('Pro features include:', 'burst-statistics')}</p>
              <span><Icon name={'world'} /><p><b>{__('See Countries:', 'burst-statistics')}</b> {__('Know where your visitors are from.', 'burst-statistics')}</p></span>
              <span><Icon name={'goals'} /><p><b>{__('Track More Goals:', 'burst-statistics')}</b> {__('Follow different things at the same time.', 'burst-statistics')}</p></span>
              <span><Icon name={'filters'} /><p><b>{__('Filter by Country:', 'burst-statistics')}</b> {__('Only see data from specific places.', 'burst-statistics')}</p></span>
            </div>
            <div className={'burst-pro-popover__footer'}>
              <a href={'https://burst-statistics.com/pricing/?src=countries-upsell'} target="_blank"  className={'burst-button burst-button--pro'}>{__('Upgrade to Pro', 'burst-statistics')}</a>
              <a href={'https://burst-statistics.com/?src=countries-upsell'} target="_blank"  className={'burst-button burst-button--secondary'}>{__('Learn More', 'burst-statistics')}</a>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
  );
};

export default ProPopover;