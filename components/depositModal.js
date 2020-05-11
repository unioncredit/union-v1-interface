import { useDepositModalOpen, useDepositModalToggle } from "@contexts/Stake";
import useCurrentToken from "@hooks/useCurrentToken";
import useTokenBalance from "@hooks/useTokenBalance";
import { useAutoEffect, useAutoMemo } from "hooks.macro";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const DepositModal = ({ totalStake, rewardsMultiplier, onDeposit }) => {
  const open = useDepositModalOpen();
  const toggle = useDepositModalToggle();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    errors,
    formState,
  } = useForm();

  const { dirty, isSubmitting } = formState;

  const amount = watch("amount", 0);

  const DAI = useCurrentToken("DAI");

  const daiBalance = useTokenBalance(DAI);

  const flooredDaiBalance = useAutoMemo(
    () => Math.floor(daiBalance * 100) / 100
  );

  const onSubmit = async (values) => {
    await onDeposit(values.amount);

    toggle();
  };

  const formatIncreasesUPY = Number(
    parseFloat(amount || 0) * (parseFloat(rewardsMultiplier) / 100)
  ).toFixed(2);

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
              message: `Value must be less than or equal to ${flooredDaiBalance}`,
            },
            min: {
              value: 0,
              message: "Value must be greater than 0",
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
