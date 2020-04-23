import { useDepositModalOpen, useDepositModalToggle } from "@contexts/Stake";
import useCurrentToken from "@hooks/useCurrentToken";
import useTokenBalance from "@hooks/useTokenBalance";
import { useAutoEffect } from "hooks.macro";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const DepositModal = ({ totalStake, rewardsMultiplier, onDeposit }) => {
  const open = useDepositModalOpen();
  const toggle = useDepositModalToggle();

  const { handleSubmit, register, watch, setValue } = useForm();

  const amount = watch("amount", 0);

  const DAI = useCurrentToken("DAI");

  const [balance, setBalance] = useState(0);

  const daiBalance = useTokenBalance(DAI, 2);

  useAutoEffect(() => {
    let isMounted = true;

    const getDaiBalance = async () => {
      if (isMounted) {
        setBalance(await daiBalance);
      }
    };

    getDaiBalance();

    return () => {
      isMounted = false;
    };
  });

  const onSubmit = (values) => {
    onDeposit(values.amount);
  };

  const formatIncreasesUPY = Number(
    parseFloat(amount || 0) * (parseFloat(rewardsMultiplier) / 100)
  ).toFixed(2);

  const formatNewTotalStake = Number(
    parseFloat(amount || 0) + parseFloat(totalStake)
  );

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
          className="mb-8"
          id="amount"
          label="Deposit Amount"
          placeholder="0.00"
          max={balance}
          setMax={() => setValue("amount", balance)}
          setMaxValue={balance}
          ref={register}
          required
          // tip={`Increases your UPY by ${formatIncreasesUPY} UNION`}
          type="number"
          min={0}
        />

        <div className="divider" />

        <LabelPair
          className="mb-6 mt-4"
          label="New total stake"
          value={formatNewTotalStake}
          valueType="DAI"
        />

        <Button full type="submit">
          Confirm
        </Button>
      </form>
    </Modal>
  );
};

export default DepositModal;
