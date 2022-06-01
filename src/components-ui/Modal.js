import { useEffect } from "react";
import { Modal as UIModal } from "@unioncredit/ui";
import getScrollbarWidth from "util/getScrollbarWidth";

export function Modal(props) {
  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style = `overflow:hidden;margin-right:${scrollbarWidth}px;`;
    return () => {
      document.body.style = "overflow-y:scroll;margin-right:0;";
    };
  }, []);

  const handleClose = () => {
    if (typeof props.onClose === "function") {
      props.onClose();
    }
  };

  return <UIModal {...props} onClose={handleClose} />;
}

Modal.Footer = UIModal.Footer;
Modal.Body = UIModal.Body;
