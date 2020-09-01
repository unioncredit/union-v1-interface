import { useWeb3React } from "@web3-react/core";
import useStakeDeposit from "hooks/payables/useStakeDeposit";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import useTokenBalance from "hooks/useTokenBalance";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import { roundDown } from "util/numbers";
import Button from "../button";
import Input from "../input";
import LabelPair from "../labelPair";
import Modal, { ModalHeader } from "../modal";
import { useDepositModalOpen, useDepositModalToggle } from "./state";
import errorMessages from "text/errorMessages";

const DepositModal = ({ totalStake, onComplete }) => {
  const { library } = useWeb3React();

  const stake = useStakeDeposit();

  const open = useDepositModalOpen();
  const toggle = useDepositModalToggle();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    errors,
    formState,
    reset,
  } = useForm();

  const { isDirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const DAI = useCurrentToken("DAI");

  const { data: daiBalance = 0.0, mutate: updateDaiBalance } = useTokenBalance(
    DAI
  );

  useEffect(() => {
    reset();
    updateDaiBalance();
  }, [open]);

  const flooredDaiBalance = roundDown(daiBalance);

  const addToast = useToast();

  const onSubmit = async (values) => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    try {
      const tx = await stake(values.amount);

      const { hide: hidePending } = addToast(FLAVORS.TX_PENDING(tx.hash));

      hidePendingToast = hidePending;

      if (open) toggle();

      const receipt = await library.waitForTransaction(tx.hash);

      if (receipt.status === 1) {
        hidePending();

        addToast(FLAVORS.TX_SUCCESS(tx.hash));

        await onComplete();

        return;
      }

      hidePending();

      txReceipt = receipt;

      throw new Error(receipt.logs[0]);
    } catch (err) {
      hidePendingToast();

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message, txReceipt?.transactionHash));
    }
  };

  const formatNewTotalStake = Number(
    parseFloat(amount || 0) + parseFloat(totalStake)
  ).toFixed(2);

  const handleSetMax = () =>
    setValue("amount", flooredDaiBalance, {
      shouldDirty: true,
      shouldValidate: true,
    });

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Deposit" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <dl className="flex justify-between items-center mb-4">
          <dt>Current total stake</dt>
          <dd className="text-right">{`${totalStake} DAI`}</dd>
        </dl>

        <Input
          autoFocus
          chip="DAI"
          id="amount"
          step="0.01"
          type="number"
          label="Amount"
          placeholder="0.00"
          setMaxValue={flooredDaiBalance}
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
          label="New total stake"
          value={formatNewTotalStake}
          valueType="DAI"
        />

        <div className="divider" />

        <div className="mt-6">
          <Button
            full
            type="submit"
            submitting={isSubmitting}
            disabled={isSubmitting || !isDirty}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DepositModal;
