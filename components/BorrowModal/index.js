import { useWeb3React } from "@web3-react/core";
import { useBorrowModalOpen, useBorrowModalToggle } from "contexts/Borrow";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import { borrow } from "lib/contracts/borrow";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Info from "svgs/Info";
import handleTxError from "util/handleTxError";
import { roundDown, roundUp } from "util/numbers";
import Button from "../button";
import Input from "../input";
import LabelPair from "../labelPair";
import Modal, { ModalHeader } from "../modal";

/**
 * @name BorrowModal
 * @param {Object} props
 * @param {Number} props.balanceOwed
 * @param {Number} props.creditLimit
 * @param {Number} props.fee
 * @param {String} props.paymentDueDate
 * @param {Promise<Void>} props.onComplete
 */
const BorrowModal = ({
  balanceOwed,
  creditLimit,
  fee,
  onComplete,
  paymentDueDate,
}) => {
  const { library, chainId } = useWeb3React();
  const curToken = useCurrentToken();

  const open = useBorrowModalOpen();
  const toggle = useBorrowModalToggle();

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

  const { dirty, isSubmitting } = formState;

  const addToast = useToast();

  const onSubmit = async (values) => {
    let hidePendingToast = () => {};

    const { amount } = values;

    try {
      const tx = await borrow(curToken, amount, library.getSigner(), chainId);

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

      throw new Error(receipt.logs[0]);
    } catch (err) {
      hidePendingToast();

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message));
    }
  };

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const calculateBalanceOwed =
    Number(balanceOwed) > 0 ? roundUp(Number(balanceOwed)) : 0;

  const calculateFee = amount * Number(fee);

  const calculateNewBalance = calculateBalanceOwed + amount + calculateFee;

  const formatNewBalance = Number(
    calculateNewBalance > 0 ? calculateNewBalance : 0
  ).toFixed(2);

  const calculateNewCredit =
    Number(roundDown(creditLimit)) - amount - calculateFee;

  const formatNewCredit = Number(
    calculateNewCredit > 0 ? calculateNewCredit : 0
  ).toFixed(2);

  const formatMax = roundDown(creditLimit * (1 - fee));

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
          <dd className="text-right">{`${calculateBalanceOwed} DAI`}</dd>
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
          setMaxValue={formatMax}
          setMax={() => setValue("amount", formatMax)}
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            max: {
              value: formatMax,
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
            <span className="underline">
              Includes fee of {calculateFee.toFixed(2)} DAI
            </span>
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
          <dd className="text-right">
            {paymentDueDate !== "-" ? paymentDueDate : `in 30 days`}
          </dd>
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

BorrowModal.propTypes = {
  balanceOwed: PropTypes.number.isRequired,
  creditLimit: PropTypes.number.isRequired,
  fee: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  paymentDueDate: PropTypes.string.isRequired,
};

export default BorrowModal;
