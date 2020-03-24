import { useDepositModalOpen, useDepositModalToggle } from "@contexts/Stake";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const DepositModal = ({ totalStake }) => {
  const open = useDepositModalOpen();
  const toggle = useDepositModalToggle();

  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    setTimeout(() => console.log(values), 1000);
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Deposit" onDismiss={toggle} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-6 sm:px-6 sm:py-8"
      >
        <LabelPair
          className="mb-6"
          label="Current total stake"
          value={totalStake}
        />

        <Input
          autoFocus
          chip="DAI"
          className="mb-8"
          id="depositAmount"
          label="Deposit Amount"
          placeholder="0.00"
          ref={register}
          required
          tip={`Increases your UPY by ${0} UNION`}
          type="number"
        />

        <div className="divider" />

        <LabelPair
          className="mb-8 mt-6"
          label="New total stake"
          value={totalStake}
        />

        <Button full type="submit">
          Confirm
        </Button>
      </form>
    </Modal>
  );
};

export default DepositModal;
