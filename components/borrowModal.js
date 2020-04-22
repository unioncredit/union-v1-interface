import { useBorrowModalOpen, useBorrowModalToggle } from "@contexts/Borrow";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const BorrowModal = ({
  balanceOwed,
  creditLimit,
  paymentDueDate,
  fee,
  onBorrow,
}) => {
  const open = useBorrowModalOpen();
  const toggle = useBorrowModalToggle();

  const { handleSubmit, watch, getValues, register } = useForm();

  const onSubmit = (values) => {
    onBorrow(values.amount);
  };

  let value = getValues();
  watch("amount");

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Borrow" onDismiss={toggle} />
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
          min={0}
          type="number"
        />

        <LabelPair
          className="mt-4"
          label="New balance owed"
          value={(
            parseFloat(balanceOwed) +
            parseFloat(value.amount ? value.amount : 0)
          ).toFixed(4)}
          valueType="DAI"
        />

        <div className="text-right text-xs mb-4">
          <span role="img" aria-label="Information">
            ℹ️
          </span>{" "}
          <span className="underline">
            Includes fee of{" "}
            {(
              parseFloat(value.amount ? value.amount : 0) * parseFloat(fee)
            ).toFixed(4)}{" "}
            DAI
          </span>
        </div>

        <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">New available credit</dt>
          <dd className="text-right">{`${(
            parseFloat(creditLimit) -
            parseFloat(balanceOwed) -
            parseFloat(value.amount ? value.amount : 0)
          ).toFixed(4)} DAI`}</dd>
        </dl>

        <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">Next payment due</dt>
          <dd className="text-right">{paymentDueDate}</dd>
        </dl>

        <div className="divider" />

        <div className="mt-6">
          <Button full type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BorrowModal;
