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
      <div className="mb-8">
        <p className="text-center text-xl mb-3">Connect your wallet</p>
        <div className="divider" />
        <p className="text-center leading-tight mt-6">
          As a final step your wallet will ask you to authorize UNION to access
          your account.
        </p>
      </div>
    </Modal>
  );
};

export default WalletModal;
