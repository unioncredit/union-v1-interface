import { useAddressModalOpen, useAddressModalToggle } from "@contexts/Stake";
import Modal from "./modal";

const AddressModal = ({ data }) => {
  const isOpen = useAddressModalOpen();
  const toggle = useAddressModalToggle();

  return (
    <Modal isOpen={isOpen} onDismiss={toggle}>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </Modal>
  );
};

export default AddressModal;
