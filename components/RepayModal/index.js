import { useWeb3React } from "@web3-react/core";
import { REPAY_MARGIN } from "constants/variables";
import useRepay from "hooks/payables/useRepay";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import useTokenBalance from "hooks/useTokenBalance";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import { roundDown } from "util/numbers";
import Button from "../button";
import Input from "../input";
import LabelPair from "../labelPair";
import Modal, { ModalHeader } from "../modal";
import { useRepayModalOpen, useRepayModalToggle } from "./state";
import errorMessages from "text/errorMessages";

/**
 * @name RepayModal
 * @param {Object} props
 * @param {Number} props.balanceOwed
 * @param {Promise<Void>} props.onComplete
 */
const RepayModal = ({ balanceOwed, onComplete }) => {
  const { library, chainId } = useWeb3React();
  const curToken = useCurrentToken();

  const open = useRepayModalOpen();
  const toggle = useRepayModalToggle();

  const repay = useRepay();

  const {
    errors,
    formState,
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
  } = useForm();

  useEffect(() => {
    reset();
    updateDaiBalance();
  }, [open]);

  const { isDirty, isSubmitting } = formState;

  const addToast = useToast();

  const { data: daiBalance = 0.0, mutate: updateDaiBalance } = useTokenBalance(
    curToken
  );

  const flooredDaiBalance = roundDown(daiBalance);

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const calculateBalanceOwed = balanceOwed > 0 ? balanceOwed : 0;

  const calculateNewBalance = calculateBalanceOwed - amount;

  const formatNewBalance = calculateNewBalance.toFixed(2);

  const calculateMaxValue =
    flooredDaiBalance <= calculateBalanceOwed
      ? flooredDaiBalance
      : calculateBalanceOwed;

  const onSubmit = async (values) => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    const amountToRepay =
      Number(values.amount) === calculateMaxValue
        ? Number(values.amount * REPAY_MARGIN) > flooredDaiBalance
          ? flooredDaiBalance
          : Number(values.amount * REPAY_MARGIN)
        : Number(values.amount);

    try {
      const tx = await repay(amountToRepay);

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

  const handleSetMax = () =>
    setValue("amount", calculateMaxValue.toFixed(2), {
      shouldDirty: true,
      shouldValidate: true,
    });

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Repay" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <p className="mb-4">How much would you like to repay?</p>

        <Input
          autoFocus
          chip="DAI"
          id="amount"
          step="0.01"
          name="amount"
          type="number"
          label="Amount"
          placeholder="0.00"
          setMaxValue={calculateMaxValue.toFixed(2)}
          setMax={handleSetMax}
          error={errors.amount}
          ref={register({
            required: errorMessages.required,
            max: {
              value: flooredDaiBalance,
              message: errorMessages.notEnoughBalanceDAI,
            },
            min: {
              value: 0.01,
              message: errorMessages.minValuePointZeroOne,
            },
          })}
        />

        <LabelPair
          className="mt-4 mb-2"
          label="New balance owed"
          value={formatNewBalance}
          valueType="DAI"
        />

        {/* <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">New min payment</dt>
          <dd className="text-right">{`${0} DAI`}</dd>
        </dl> */}

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

RepayModal.propTypes = {
  balanceOwed: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default RepayModal;
