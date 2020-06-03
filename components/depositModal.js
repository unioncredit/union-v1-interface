import { useWeb3React } from "@web3-react/core";
import { useDepositModalOpen, useDepositModalToggle } from "contexts/Stake";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import useTokenBalance from "hooks/useTokenBalance";
import { stake } from "lib/contracts/stake";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import { roundDown } from "util/numbers";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const DepositModal = ({ totalStake, rewardsMultiplier, onComplete }) => {
  const { library, chainId } = useWeb3React();

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

  useEffect(() => {
    reset();
    updateDaiBalance();
  }, [open]);

  const { dirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const DAI = useCurrentToken("DAI");

  const { data: daiBalance = 0.0, mutate: updateDaiBalance } = useTokenBalance(
    DAI
  );

  const flooredDaiBalance = roundDown(daiBalance);

  const addToast = useToast();

  const onSubmit = async (values) => {
    let hidePendingToast = () => {};

    try {
      const tx = await stake(DAI, values.amount, library.getSigner(), chainId);

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

  const formatNewTotalStake = Number(
    parseFloat(amount || 0) + parseFloat(totalStake)
  ).toFixed(2);

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
          id="amount"
          step="0.01"
          type="number"
          label="Amount"
          className="mb-8"
          placeholder="0.00"
          setMaxValue={flooredDaiBalance}
          setMax={() => setValue("amount", flooredDaiBalance)}
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

        <div className="divider" />

        <LabelPair
          className="mb-6 mt-4"
          label="New total stake"
          value={formatNewTotalStake}
          valueType="DAI"
        />

        <Button
          full
          type="submit"
          submitting={isSubmitting}
          disabled={isSubmitting || !dirty}
        >
          Confirm
        </Button>
      </form>
    </Modal>
  );
};

export default DepositModal;
