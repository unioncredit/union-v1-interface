import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useWithdrawModalOpen, useWithdrawModalToggle } from "contexts/Stake";
import useCurrentToken from "hooks/useCurrentToken";
import useStakingContract from "hooks/useStakingContract";
import useToast, { FLAVORS } from "hooks/useToast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const WithdrawModal = ({ withdrawableStake, totalStake, onComplete }) => {
  const { chainId } = useWeb3React();

  const open = useWithdrawModalOpen();
  const toggle = useWithdrawModalToggle();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState,
    errors,
    reset,
  } = useForm();

  useEffect(() => reset(), [open]);

  const { dirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const DAI = useCurrentToken("DAI");

  const addToast = useToast();

  const stakingContract = useStakingContract();

  const onSubmit = async (values) => {
    try {
      const amount = parseUnits(values.amount, 18).toString();

      const tx = await stakingContract.unstake(DAI, amount);

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING(tx.hash, chainId)
      );

      if (open) toggle();

      await tx.wait();

      hidePending();

      addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));

      onComplete();
    } catch (err) {
      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message));
    }
  };

  const calculateNewTotalStake = Number(totalStake) - amount;

  const formatNewTotalStake = Number(
    calculateNewTotalStake > 0 ? calculateNewTotalStake : 0
  ).toFixed(2);

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Withdraw" onDismiss={toggle} />
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
          name="amount"
          type="number"
          label="Amount"
          className="mb-8"
          placeholder="0.00"
          setMaxValue={withdrawableStake}
          setMax={() => setValue("amount", withdrawableStake)}
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            max: {
              value: withdrawableStake,
              message: `Value must be less than or equal to ${withdrawableStake}`,
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

export default WithdrawModal;
