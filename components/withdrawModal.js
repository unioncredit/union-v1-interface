import { useWithdrawModalOpen, useWithdrawModalToggle } from "contexts/Stake";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const WithdrawModal = ({ withdrawableStake, totalStake, onWithdraw }) => {
  const open = useWithdrawModalOpen();
  const toggle = useWithdrawModalToggle();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState,
    errors,
  } = useForm();

  const { dirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const onSubmit = async (values) => {
    await onWithdraw(values.amount);

    toggle();
  };

  const calculateNewTotalStake = Number(totalStake) - amount;

  const formatNewTotalStake = Number(
    calculateNewTotalStake > 0 ? calculateNewTotalStake : 0
  ).toFixed(2);

  const formatWithdrawableStake = Number(withdrawableStake).toFixed(2);

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
          setMaxValue={formatWithdrawableStake}
          setMax={() => setValue("amount", formatWithdrawableStake)}
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            max: {
              value: formatWithdrawableStake,
              message: `Value must be less than or equal to ${formatWithdrawableStake}`,
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

export default WithdrawModal;
