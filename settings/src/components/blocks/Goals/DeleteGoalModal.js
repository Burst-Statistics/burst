import Modal from '../../common/Modal';
import {formatUnixToDate} from '../../../utils/formatting';
import {__} from '@wordpress/i18n';
import Icon from '../../../utils/Icon';
import {Close} from '@radix-ui/react-dialog';

const Content = ({goal}) => (
    <>
      {__('Are you sure you want to delete this goal?', 'burst-statistics') +
          ' ' + __('This action cannot be undone.', 'burst-statistics')}
      <br/>
      <br/>
        <strong>{__('Goal name', 'burst-statistics')}:</strong> {goal.name}
        <br/>
        <strong>{__('Status', 'burst-statistics')}:</strong> {goal.status}
        <br/>
        <strong>{__('Date created',
            'burst-statistics')}:</strong> {formatUnixToDate(goal.dateCreated)}
    </>
);

const Footer = ({onDelete}) => {

  return (
      <>
      <Close asChild aria-label="Close">
        <button className={"burst-button burst-button--secondary"}>
          {__('Cancel', 'burst-statistics')}
        </button>
      </Close>
        <button className={'burst-button burst-button--tertiary'} onClick={() => onDelete()}>
          {__('Delete goal', 'burst-statistics')}
        </button>
      </>
  );
}

const DeleteGoalModal = ({goal, onDelete}) => {
  return (
      <Modal
          title={__('Delete goal', 'burst-statistics')}
          content={<Content goal={goal} />}
          footer={<Footer onDelete={onDelete} />}
          triggerClassName={'burst-button-icon burst-button-icon--delete'}
      >
        <Icon name={'trash'} size={18}/>
      </Modal>
  );
};

export default DeleteGoalModal;
