import { useDepositModalOpen, useDepositModalToggle } from "@contexts/Stake";
import Button from "./button";
import Input from "./input";
import Modal, { ModalHeader } from "./modal";

const DepositModal = () => {
  const open = useDepositModalOpen();
  const toggle = useDepositModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Deposit" onDismiss={toggle} />
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">Current total stake</div>

        <Input
          className="mb-4"
          id="depositAmount"
          label="Deposit Amount"
          placeholder="0.00"
          chip="DAI"
          tip="Increases your UPY by 0 UNION"
        />

        <div className="w-full h-px bg-border-pure" />

        <div className="mb-8 mt-6">New total stake</div>

        <Button full>Confirm</Button>
      </div>
    </Modal>
  );
};

export default DepositModal;
