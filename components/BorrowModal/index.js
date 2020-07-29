import Tooltip from "@reach/tooltip";
import { useWeb3React } from "@web3-react/core";
import useBorrow from "hooks/payables/useBorrow";
import useToast, { FLAVORS } from "hooks/useToast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Info from "svgs/Info";
import { feeTip } from "text/tooltips";
import handleTxError from "util/handleTxError";
import { roundDown, roundUp } from "util/numbers";
import Button from "../button";
import Input from "../input";
import LabelPair from "../labelPair";
import Modal, { ModalHeader } from "../modal";
import { useBorrowModalOpen, useBorrowModalToggle } from "./state";

/**
 * @name BorrowModal
 * @param {Object} props
 * @param {Number} props.balanceOwed
 * @param {Number} props.creditLimit
 * @param {Number} props.fee
 * @param {String} props.paymentDueDate
 * @param {Promise<Void>} props.onComplete
 * @param {Boolean} props.isOverdue
 */
const BorrowModal = ({
  balanceOwed,
  creditLimit,
  fee,
  onComplete,
  paymentDueDate,
  paymentPeriod,
  isOverdue = true,
}) => {
  const { library, chainId } = useWeb3React();

  const open = useBorrowModalOpen();
  const toggle = useBorrowModalToggle();

  const borrow = useBorrow();

  const {
    errors,
    formState,
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
  } = useForm();

  useEffect(() => reset(), [open]);

  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (isDirty && isOverdue) {
      addToast(FLAVORS.OVERDUE);
    }
  }, [isOverdue, isDirty]);

  const addToast = useToast();

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const calcBalanceOwed = balanceOwed > 0 ? balanceOwed : 0;

  const calcMaxIncludingFee = roundDown(creditLimit * (1 - fee));

  /**
   * Handle fee logic if the amount is the calculated max value instead of calculating the fee based on the amount passed, which in the case of using the "Max" prefill would have already had the fee taken out of it.
   */
  const calculateFee =
    amount === calcMaxIncludingFee
      ? roundDown(creditLimit * fee)
      : amount * fee;

  const calcNewBalanceOwed = calcBalanceOwed + amount + calculateFee;

  const newBalanceOwed = calcNewBalanceOwed.toFixed(2);

  const calcNewCredit = roundDown(creditLimit) - amount - calculateFee;

  const newAvailableCredit =
    calcNewCredit <= 0 ? Number(0).toFixed(2) : calcNewCredit.toFixed(2);

  const nextPaymentDue =
    paymentDueDate !== "-" &&
    paymentDueDate !== "No Payment Due" &&
    calcBalanceOwed > 0
      ? paymentDueDate
      : paymentPeriod;

  const onSubmit = async (values) => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    const { amount } = values;

    try {
      const tx = await borrow(amount);

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING(tx.hash, chainId)
      );

      hidePendingToast = hidePending;

      if (open) toggle();

      const receipt = await library.waitForTransaction(tx.hash);

      if (receipt.status === 1) {
        hidePending();

        addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));

        await onComplete();

        return;
      }

      hidePending();

      txReceipt = receipt;

      throw new Error(receipt.logs[0]);
    } catch (err) {
      hidePendingToast();

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message, txReceipt?.transactionHash, chainId));
    }
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Borrow" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <p className="mb-4">How much would you like to borrow?</p>

        <Input
          autoFocus
          chip="DAI"
          id="amount"
          name="amount"
          step="0.01"
          type="number"
          label="Amount"
          placeholder="0.00"
          setMaxValue={calcMaxIncludingFee}
          setMax={() =>
            setValue("amount", calcMaxIncludingFee, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            max: {
              value: calcMaxIncludingFee,
              message: "Not enough available credit",
            },
            min: {
              value: 1.0,
              message: "The minimum borrow is 1.00 DAI",
            },
          })}
        />

        <LabelPair
          className="mt-4"
          label="New balance owed"
          value={newBalanceOwed}
          valueType="DAI"
        />

        <div className="flex justify-end mb-4">
          <Tooltip label={feeTip}>
            <span className="inline-flex items-center text-xs cursor-help">
              <div className="mr-2">
                <Info />
              </div>
              <span className="underline">
                Includes fee of {calculateFee.toFixed(2)} DAI
              </span>
            </span>
          </Tooltip>
        </div>

        <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">New available credit</dt>
          <dd className="text-right">{`${newAvailableCredit} DAI`}</dd>
        </dl>

        <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">Next payment due</dt>
          <dd className="text-right">{nextPaymentDue}</dd>
        </dl>

        <div className="divider" />

        <div className="mt-6">
          <Button
            full
            type="submit"
            disabled={isSubmitting || !isDirty}
            submitting={isSubmitting}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

BorrowModal.propTypes = {
  balanceOwed: PropTypes.number.isRequired,
  creditLimit: PropTypes.number.isRequired,
  fee: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  paymentDueDate: PropTypes.string.isRequired,
};

export default BorrowModal;
