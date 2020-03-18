import Modal from "./modal";

const AddressModal = () => {
  const onDismiss = () => false;
  const isOpen = false;

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ea
        fugiat itaque. Repudiandae, laboriosam similique! Saepe voluptas
        temporibus eos porro, veniam, non ipsum voluptatem quisquam illum
        tempore quos voluptatum autem.
      </p>
    </Modal>
  );
};

export default AddressModal;
