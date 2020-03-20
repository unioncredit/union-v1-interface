import {
  useWalletModalOpen,
  useWalletModalToggle
} from "@contexts/Application";
import Modal from "./modal";
import Button from "./button";

const WalletModal = () => {
  const open = useWalletModalOpen();
  const toggle = useWalletModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-8">
          <p className="text-center text-xl mb-3">Connect your wallet</p>
          <div className="w-full h-px h-1 bg-primary-500" />
          <p className="text-center leading-tight mt-6">
            As a final step your wallet will ask you to authorize Union to
            access your account.
          </p>
        </div>

        <div className="mt-8 mb-10">
          <div className="mt-4">
            <Button full type="invert">
              MetaMask
            </Button>
          </div>
          <div className="mt-4">
            <Button full type="invert">
              WalletConnect
            </Button>
          </div>
          <div className="mt-4">
            <Button full type="invert">
              Fortmatic
            </Button>
          </div>
        </div>

        <div className="w-full h-px bg-accent" />

        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <button className="underline font-medium">Start now</button>
        </p>
      </div>
    </Modal>
  );
};

export default WalletModal;
