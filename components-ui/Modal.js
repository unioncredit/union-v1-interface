import { useEffect } from "react";
import { Modal as UIModal } from "union-ui";
import { drawerOpenState } from "hooks/useIsDrawerOpen";

export function Modal(props) {
  useEffect(() => {
    if (props.drawer) {
      drawerOpenState.set(true);
    } else {
      drawerOpenState.set(false);
    }
  }, [props.drawer]);

  const handleClose = () => {
    drawerOpenState.set(false);
    if (typeof props.onClose === "function") {
      props.onClose();
    }
  };

  return <UIModal {...props} onClose={handleClose} />;
}

Modal.Footer = UIModal.Footer;
Modal.Body = UIModal.Body;
