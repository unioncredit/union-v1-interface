import {
  useWalletModalOpen,
  useWalletModalToggle
} from "@contexts/Application";
import Modal from "./modal";

const WalletModal = () => {
  const walletModalOpen = useWalletModalOpen();
  const toggleWalletModal = useWalletModalToggle();

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet porro
      placeat quibusdam nisi id ipsa temporibus voluptas nostrum impedit quod,
      magni, illo voluptatum mollitia excepturi dicta quaerat maiores voluptates
      architecto!
    </Modal>
  );
};

export default WalletModal;
