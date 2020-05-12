import { useWeb3React } from "@web3-react/core";
import { REPAY_MARGIN } from "constants/variables";
import { useRepayModalOpen, useRepayModalToggle } from "contexts/Borrow";
import useCurrentToken from "hooks/useCurrentToken";
import useToast from "hooks/useToast";
import { repay } from "lib/contracts/repay";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

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
  } = useForm();

  const { dirty, isSubmitting } = formState;

  const addToast = useToast();

  const onSubmit = async (values) => {
    const { amount } = values;

    try {
      await repay(curToken, amount, library.getSigner(), chainId);

      toggle();

      onComplete();
    } catch (err) {
      const message = handleTxError(err);

      addToast(message, { type: "error", hideAfter: 20 });

      toggle();
    }
  };

  const amount = watch("amount", 0);

  const formatNewBalance = Number(
    parseFloat(balanceOwed) > 0 &&
      parseFloat(balanceOwed) - parseFloat(amount || 0) > 0
      ? parseFloat(balanceOwed) - parseFloat(amount || 0)
      : 0
  ).toFixed(2);

  const formatBalanceOwed = Number(balanceOwed * REPAY_MARGIN).toFixed(2);

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
          <dd className="text-right">{`${formatBalanceOwed} DAI`}</dd>
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
          setMaxValue={formatBalanceOwed}
          setMax={() => setValue("amount", formatBalanceOwed)}
          placeholder="0.00"
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            min: {
              value: 0,
              message: "Value must be greater than 0",
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

export default RepayModal;
