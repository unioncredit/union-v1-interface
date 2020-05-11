import { useBorrowModalOpen, useBorrowModalToggle } from "@contexts/Borrow";
import { commify } from "@ethersproject/units";
import { useForm } from "react-hook-form";
import Info from "svgs/Info";
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

  const {
    handleSubmit,
    watch,
    register,
    setValue,
    formState,
    errors,
  } = useForm();

  const { dirty, isSubmitting } = formState;

  const onSubmit = async (values) => {
    await onBorrow(values.amount);

    toggle();
  };

  const amount = watch("amount", 0);

  const formatFee = Number(parseFloat(amount || 0) * parseFloat(fee)).toFixed(
    2
  );

  const formatNewBalance = commify(
    Number(
      parseFloat(balanceOwed) + parseFloat(amount || 0) * parseFloat(fee)
    ).toFixed(2)
  );

  const formatNewCredit = Number(
    parseFloat(creditLimit) > 0
      ? parseFloat(creditLimit) - parseFloat(amount || 0)
      : 0
  ).toFixed(2);

  const maxBorrowable = Number(
    parseFloat(creditLimit) > 0 ? parseFloat(creditLimit) : 0
  ).toFixed(2);

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
          step="0.01"
          type="number"
          label="Amount"
          placeholder="0.00"
          setMaxValue={maxBorrowable}
          setMax={() => setValue("amount", maxBorrowable)}
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            max: {
              value: maxBorrowable,
              message: `Value must be less than or equal to ${maxBorrowable}`,
            },
            min: {
              value: 0,
              message: "Value must be greater than 0",
            },
          })}
        />

        <LabelPair
          className="mt-4"
          label="New balance owed"
          value={formatNewBalance}
          valueType="DAI"
        />

        <div className="flex justify-end mb-4">
          <span
            className="inline-flex items-center text-xs cursor-help"
            title={""}
          >
            <div className="mr-2">
              <Info />
            </div>
            <span className="underline">Includes fee of {formatFee} DAI</span>
          </span>
        </div>

        <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">New available credit</dt>
          <dd className="text-right">{`${formatNewCredit} DAI`}</dd>
        </dl>

        <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">Next payment due</dt>
          <dd className="text-right">{paymentDueDate ?? `in 30 days`}</dd>
        </dl>

        <div className="divider" />

        <div className="mt-6">
          <Button
            full
            type="submit"
            disabled={isSubmitting || !dirty}
            submitting={isSubmitting}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BorrowModal;
