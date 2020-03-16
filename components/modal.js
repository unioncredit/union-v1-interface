import { DialogContent, DialogOverlay } from "@reach/dialog";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onDismiss, children, label = "Modal" }) => {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss} aria>
      <DialogContent aria-label={label}>{children}</DialogContent>
    </DialogOverlay>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.any
};

export default Modal;
