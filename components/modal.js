import { DialogContent, DialogOverlay } from "@reach/dialog";
import PropTypes from "prop-types";
import VisuallyHidden from "@reach/visually-hidden";

export const ModalHeader = ({ title, onDismiss }) => (
  <div className="px-4 py-6 sm:px-6 border-b relative">
    <p className="text-center leading-none">{title}</p>
    <button
      className="focus:outline-none focus:shadow-outline leading-none p-2 rounded absolute inline-flex right-0 top-0 mr-6 mt-4"
      onClick={onDismiss}
    >
      <VisuallyHidden>Close</VisuallyHidden>
      <span aria-hidden className="w-4" role="img">
        ❌
      </span>
    </button>
  </div>
);

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
