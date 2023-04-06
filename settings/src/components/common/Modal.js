import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '../../utils/Icon';

const Modal = ({isOpen, title, onClose, children}) => {
  return (
      <Dialog open={isOpen} onClose={onClose} sx={{ borderRadius: 'var(--rsp-border-radius-s)' }}>
        <DialogTitle>
          {title}
        </DialogTitle>
        {children}
      </Dialog>
  );
};

export default Modal;
