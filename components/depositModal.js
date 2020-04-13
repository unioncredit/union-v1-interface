import { useDepositModalOpen, useDepositModalToggle } from "@contexts/Stake";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const DepositModal = ({ totalStake, onDeposit }) => {
  const open = useDepositModalOpen();
  const toggle = useDepositModalToggle();

  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    onDeposit(values.depositAmount);
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Deposit" onDismiss={toggle} />
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

export default DepositModal;
