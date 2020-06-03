import { useWeb3React } from "@web3-react/core";
import { REPAY_MARGIN } from "constants/variables";
import { useRepayModalOpen, useRepayModalToggle } from "contexts/Borrow";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import useTokenBalance from "hooks/useTokenBalance";
import { repay } from "lib/contracts/repay";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import { roundDown } from "util/numbers";
import Button from "../button";
import Input from "../input";
import LabelPair from "../labelPair";
import Modal, { ModalHeader } from "../modal";

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

  const { dirty, isSubmitting } = formState;

  const addToast = useToast();

  const { data: daiBalance = 0.0, mutate: updateDaiBalance } = useTokenBalance(
    curToken
  );

  const flooredDaiBalance = roundDown(daiBalance);

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const calculateBalanceOwed = balanceOwed > 0 ? balanceOwed : 0;

  const calculateNewBalance = calculateBalanceOwed - amount;

  const formatNewBalance = Number(
    calculateNewBalance > 0 ? calculateNewBalance : 0
  ).toFixed(2);

  const calculateMaxValue =
    flooredDaiBalance <= calculateBalanceOwed
      ? flooredDaiBalance
      : calculateBalanceOwed;

  const onSubmit = async (values) => {
    let hidePendingToast = () => {};

    const amountToRepay =
      Number(values.amount) === calculateMaxValue
        ? Number(values.amount * REPAY_MARGIN)
        : values.amount;

    try {
      const tx = await repay(
        curToken,
        amountToRepay,
        library.getSigner(),
        chainId
      );

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

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Repay" onDismiss={toggle} />
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

        <p className="mt-6 mb-4">How much would you like to repay?</p>

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
          setMax={() => setValue("amount", calculateMaxValue.toFixed(2))}
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            max: {
              value: flooredDaiBalance,
              message: "Not enough DAI in your wallet",
            },
            min: {
              value: 0.01,
              message: "Value must be greater than 0.01",
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

RepayModal.propTypes = {
  balanceOwed: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default RepayModal;
