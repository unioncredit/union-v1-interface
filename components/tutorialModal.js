import Modal from "./modal";
import { useTutorialModalOpen, useTutorialModalToggle } from "@contexts/Stake";

const TutorialModal = () => {
  const open = useTutorialModalOpen();
  const toggle = useTutorialModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ea
        fugiat itaque. Repudiandae, laboriosam similique! Saepe voluptas
        temporibus eos porro, veniam, non ipsum voluptatem quisquam illum
        tempore quos voluptatum autem.
      </p>
    </Modal>
  );
};

export default TutorialModal;
