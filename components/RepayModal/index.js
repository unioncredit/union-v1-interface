import { useWeb3React } from "@web3-react/core";
import { REPAY_MARGIN } from "constants/variables";
import useRepay from "hooks/payables/useRepay";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/useTokenBalance";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "text/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import { roundDown } from "util/numbers";
import Button from "../button";
import Input from "../input";
import LabelPair from "../labelPair";
import Modal, { ModalHeader } from "../modal";
import { useRepayModalOpen, useRepayModalToggle } from "./state";

/**
 * @name RepayModal
 * @param {Object} props
 * @param {Number} props.balanceOwed
 * @param {Promise<Void>} props.onComplete
 */
const RepayModal = ({ balanceOwed, onComplete }) => {
  const { library } = useWeb3React();
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

  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    reset();
    updateDaiBalance();
  }, [open]);

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
    const amountToRepay =
      Number(values.amount) === calculateMaxValue
        ? Number(values.amount * REPAY_MARGIN) > flooredDaiBalance
          ? flooredDaiBalance
          : Number(values.amount * REPAY_MARGIN)
        : Number(values.amount);

    try {
      const { hash } = await repay(amountToRepay);

      if (open) toggle();

      await getReceipt(hash, library);

      await onComplete();
    } catch (err) {
      handleTxError(err);
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
