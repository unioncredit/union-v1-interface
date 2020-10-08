import Modal, { ModalHeader } from "components/modal";
import { useDelegatedModalOpen, useDelegatedModalToggle } from "./state";

const DelegatedModal = () => {
  const open = useDelegatedModalOpen();
  const toggle = useDelegatedModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Delegated from others" onDismiss={toggle} />
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse beatae
        dolores nam. Officiis cumque porro alias sunt iste sed itaque architecto
        dolore. Saepe laborum illo labore nemo magnam, illum voluptas?
      </div>
    </Modal>
  );
};

export default DelegatedModal;

export const ViewDelegated = () => {
  const toggle = useDelegatedModalToggle();

  return (
    <button
      className="text-sm font-semibold underline rounded focus:outline-none focus:shadow-outline"
      onClick={toggle}
    >
      View
    </button>
  );
};
