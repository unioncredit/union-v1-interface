import { useWithdrawModalOpen, useWithdrawModalToggle } from "@contexts/Stake";
import Button from "./button";
import Input from "./input";
import Modal, { ModalHeader } from "./modal";

const WithdrawModal = () => {
  const open = useWithdrawModalOpen();
  const toggle = useWithdrawModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Withdraw" onDismiss={toggle} />
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">Current total stake</div>

        <Input
          className="mb-8"
          id="withdrawAmount"
          label="Withdraw Amount"
          placeholder="0.00"
          chip="DAI"
        />

        <div className="w-full h-px bg-accent" />

        <div className="mb-8 mt-6">New total stake</div>

        <Button full>Confirm</Button>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
