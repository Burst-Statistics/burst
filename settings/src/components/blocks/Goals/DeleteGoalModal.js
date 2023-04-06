import Modal from '../../common/Modal';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const DeleteGoalModal = ({ isOpen, goal, onDelete, onClose }) => {
  return (
      <Modal isOpen={isOpen} title="Delete Goal" onClose={onClose}>
        <DialogContent>
          <p>Are you sure you want to delete this goal? This action cannot be undone.</p>
          <p>
            <strong>Goal Name:</strong> {goal.name}
            <br />
            <strong>Status:</strong> {goal.status}
            <br />
            <strong>Date Created:</strong> {goal.dateCreated}
          </p>
        </DialogContent>
        <DialogActions>
          <button className={"burst-button burst-button--secondary"} onClick={onClose}>
            Cancel
          </button>
          <button className={"burst-button burst-button--tertiary"} onClick={onDelete}>
            Delete Goal
          </button>
        </DialogActions>
      </Modal>
  );
};

export default DeleteGoalModal;
