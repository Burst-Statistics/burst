import Modal from '../../common/Modal';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { formatUnixToDate } from '../../../utils/formatting';
import {__} from '@wordpress/i18n';

const DeleteGoalModal = ({ isOpen, goal, onDelete, onClose }) => {
  return (
      <Modal isOpen={isOpen} title="Delete Goal" onClose={onClose}>
        <DialogContent>
          <p>{__('Are you sure you want to delete this goal?', 'burst-statistics')} + ' ' + {__('This action cannot be undone.', 'burst-statistics')}</p>
          <p>
            <strong>{__('Goal name', 'burst-statistics')}:</strong> {goal.name}
            <br />
            <strong>{__('Status', 'burst-statistics')}:</strong> {goal.status}
            <br />
            <strong>{__('Date created', 'burst-statistics')}:</strong> {formatUnixToDate(goal.dateCreated)}
          </p>
        </DialogContent>
        <DialogActions>
          <button className={"burst-button burst-button--secondary"} onClick={onClose}>
              {__('Cancel', 'burst-statistics')}
          </button>
          <button className={"burst-button burst-button--tertiary"} onClick={onDelete}>
              {__('Delete goal', 'burst-statistics')}
          </button>
        </DialogActions>
      </Modal>
  );
};

export default DeleteGoalModal;
