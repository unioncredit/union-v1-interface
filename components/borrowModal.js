import { useBorrowModalOpen, useBorrowModalToggle } from "@contexts/Borrow";
import Modal, { ModalHeader } from "./modal";

const BorrowModal = () => {
  const borrowModalOpen = useBorrowModalOpen();
  const toggleBorrowModal = useBorrowModalToggle();

  return (
    <Modal isOpen={borrowModalOpen} onDismiss={toggleBorrowModal}>
      <ModalHeader title="Borrow" onDismiss={toggleBorrowModal} />
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

export default BorrowModal;
