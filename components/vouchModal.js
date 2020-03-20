import { useVouchModalOpen, useVouchModalToggle } from "@contexts/Vouch";
import Modal from "./modal";

const VouchModal = () => {
  const vouchModalOpen = useVouchModalOpen();
  const toggleVouchModal = useVouchModalToggle();

  return (
    <Modal isOpen={vouchModalOpen} onDismiss={toggleVouchModal}>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quae
          saepe illo minima recusandae tempora omnis culpa perferendis similique
          vel. Quasi dolor commodi obcaecati praesentium laborum incidunt beatae
          amet reprehenderit.
        </p>
      </div>
    </Modal>
  );
};

export default VouchModal;
