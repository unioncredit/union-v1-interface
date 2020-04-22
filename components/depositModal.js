import { useDepositModalOpen, useDepositModalToggle } from "@contexts/Stake";
import useCurrentToken from "@hooks/useCurrentToken";
import { useWeb3React } from "@web3-react/core";
import { useAutoEffect } from "hooks.macro";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const DepositModal = ({ totalStake, onDeposit }) => {
  const { library, chainId, account } = useWeb3React();

  const open = useDepositModalOpen();
  const toggle = useDepositModalToggle();

  const { handleSubmit, register, watch, setValue } = useForm();

  const watchAmount = watch("amount", 0);

  const curToken = useCurrentToken("DAI");

  const [daiBalance, setDaiBalance] = useState("0");

  useAutoEffect(() => {
    let isMounted = true;

    const getDaiBalance = async () => {
      try {
        if (isMounted) {
          if (library && account) {
            const res = await getErc20Balance(
              curToken,
              library.getSigner(),
              chainId
            );

            setDaiBalance(res);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
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
          max={daiBalance}
          setMax={() => setValue("amount", daiBalance)}
          setMaxValue={daiBalance}
          ref={register}
          required
          tip={`Increases your UPY by ${0} UNION`}
          type="number"
          min={0}
        />

        <div className="divider" />

        <LabelPair
          className="mb-6 mt-4"
          label="New total stake"
          value={Number(totalStake + watchAmount)}
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
