import { useWithdrawModalOpen, useWithdrawModalToggle } from "@contexts/Stake";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const WithdrawModal = ({ totalStake, onWithdraw }) => {
  const open = useWithdrawModalOpen();
  const toggle = useWithdrawModalToggle();

  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    onWithdraw(values.withdrawAmount);
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Withdraw" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-6 sm:px-6 sm:py-8"
      >
        <dl className="flex justify-between py-2 items-center mb-4 leading-tight">
          <dt>Current total stake</dt>
          <dd className="text-right">{`${totalStake} DAI`}</dd>
        </dl>

        <Input
          autoFocus
          chip="DAI"
          className="mb-8"
          id="withdrawAmount"
          label="Withdraw Amount"
          placeholder="0.00"
          ref={register}
          required
          type="number"
        />

        <div className="divider" />

        <LabelPair
          className="mb-6 mt-4"
          label="New total stake"
          value={0}
          valueType="DAI"
        />

        <Button full type="submit">
          Confirm
        </Button>
      </form>
    </Modal>
  );
};

export default WithdrawModal;
