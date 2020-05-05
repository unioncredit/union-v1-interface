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

  const { handleSubmit, register, watch, setValue, formState } = useForm();

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
          min={0}
          required
          autoFocus
          chip="DAI"
          id="amount"
          step="0.01"
          max={flooredDaiBalance}
          type="number"
          label="Amount"
          ref={register}
          className="mb-8"
          placeholder="0.00"
          setMaxValue={flooredDaiBalance}
          setMax={() => setValue("amount", flooredDaiBalance)}
          // tip={`Increases your UPY by ${formatIncreasesUPY} UNION`}
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
