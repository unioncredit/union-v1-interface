import { useRepayModalOpen, useRepayModalToggle } from "@contexts/Borrow";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const RepayModal = ({ balanceOwed, onRepay }) => {
  const isOpen = useRepayModalOpen();
  const toggle = useRepayModalToggle();

  const { handleSubmit, register, watch, getValues } = useForm();

  const onSubmit = (values) => {
    onRepay(values.amount);
  };

  let value = getValues();
  watch("amount");

  return (
    <Modal isOpen={isOpen} onDismiss={toggle}>
      <ModalHeader title="Repay" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
          <dt>Balance owed</dt>
          <dd className="text-right">{`${balanceOwed} DAI`}</dd>
        </dl>

        <div className="divider" />

        <p className="mt-6 mb-4">How much would you like to borrow?</p>

        <Input
          autoFocus
          chip="DAI"
          id="amount"
          name="amount"
          label="Amount"
          placeholder="0.00"
          ref={register}
          required
          type="number"
        />

        <LabelPair
          className="mt-4 mb-2"
          label="New balance owed"
          value={(
            parseFloat(balanceOwed) -
            parseFloat(value.amount ? value.amount : 0)
          ).toFixed(4)}
          valueType="DAI"
        />

        {/* <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">New min payment</dt>
          <dd className="text-right">{`${0} DAI`}</dd>
        </dl> */}

        <div className="divider" />

        <div className="mt-6">
          <Button type="submit" full>
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RepayModal;
