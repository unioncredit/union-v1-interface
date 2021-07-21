import { useWeb3React } from "@web3-react/core";
import useStakeWithdraw from "hooks/payables/useStakeWithdraw";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import Button from "../../button";
import Input from "../../input";
import LabelPair from "../../labelPair";
import Modal, { ModalHeader } from "../../modal";
import { useWithdrawModalOpen, useWithdrawModalToggle } from "./state";

const WithdrawModal = ({ withdrawableStake, totalStake, onComplete }) => {
  const { library } = useWeb3React();

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

  const { isDirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const withdraw = useStakeWithdraw();

  const onSubmit = async (values) => {
    try {
      const { hash } = await withdraw(values.amount);

      if (open) toggle();

      await getReceipt(hash, library);

      await onComplete();
    } catch (err) {
      handleTxError(err);
    }
  };

  const calculateNewTotalStake = Number(totalStake) - amount;

  const formatNewTotalStake = Number(
    calculateNewTotalStake > 0 ? calculateNewTotalStake : 0
  ).toFixed(2);

  const handleSetMax = () =>
    setValue("amount", withdrawableStake, {
      shouldDirty: true,
      shouldValidate: true,
    });

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Withdraw" onDismiss={toggle} />
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
          name="amount"
          type="number"
          label="Amount"
          placeholder="0.00"
          setMaxValue={withdrawableStake}
          setMax={handleSetMax}
          error={errors.amount}
          ref={register({
            required: errorMessages.required,
            max: {
              value: withdrawableStake,
              message: errorMessages.notEnoughStake,
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

export default WithdrawModal;
