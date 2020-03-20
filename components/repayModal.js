import { useRepayModalOpen, useRepayModalToggle } from "@contexts/Borrow";
import Modal, { ModalHeader } from "./modal";

const RepayModal = () => {
  const repayModalOpen = useRepayModalOpen();
  const toggleRepayModal = useRepayModalToggle();

  return (
    <Modal isOpen={repayModalOpen} onDismiss={toggleRepayModal}>
      <ModalHeader title="Repay" onDismiss={toggleRepayModal} />
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis vel
          distinctio quod tempora necessitatibus consequuntur ab blanditiis id
          cumque dolores facere porro nostrum, voluptatum aliquam pariatur saepe
          eos consequatur dolore.
        </p>
      </div>
    </Modal>
  );
};

export default RepayModal;
