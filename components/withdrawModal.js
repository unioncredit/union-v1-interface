import { useWithdrawModalOpen, useWithdrawModalToggle } from "@contexts/Stake";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const WithdrawModal = ({ totalStake }) => {
  const open = useWithdrawModalOpen();
  const toggle = useWithdrawModalToggle();

  const { handleSubmit, register } = useForm();

  const onSubmit = values => {
    setTimeout(() => console.log(values), 1000);
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Withdraw" onDismiss={toggle} />
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
          className="mb-8"
          id="withdrawAmount"
          label="Withdraw Amount"
          placeholder="0.00"
          ref={register}
          type="number"
          required
          chip="DAI"
        />

        <div className="w-full h-px bg-border-pure" />

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

export default WithdrawModal;
