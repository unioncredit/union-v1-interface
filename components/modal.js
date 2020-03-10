import { DialogContent, DialogOverlay } from "@reach/dialog";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onDismiss, children, label = "Modal" }) => {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss} aria>
      <DialogContent aria-label={label}>
        {children}

        <style jsx global>{`
          [data-reach-dialog-overlay] {
            background: hsla(0, 0%, 0%, 0.33);
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            overflow: auto;
          }

          [data-reach-dialog-content] {
            width: 50vw;
            margin: 10vh auto;
            background: white;
            padding: 2rem;
            outline: none;
          }
        `}</style>
      </DialogContent>
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
