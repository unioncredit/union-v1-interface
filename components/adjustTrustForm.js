import { useWeb3React } from "@web3-react/core";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";

const AdjustTrustForm = ({ address, usedTrust, onComplete }) => {
  const { library } = useWeb3React();

  const { register, handleSubmit, watch, formState, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isSubmitting, isDirty } = formState;

  const amount = watch("amount", 0);

  const adjustTrust = useAdjustTrust();

  const onSubmit = async (values) => {
    try {
      const { hash } = await adjustTrust(address, values.amount);

      await getReceipt(hash, library);

      await onComplete();
    } catch (err) {
      handleTxError(err);
    }
  };

  const handleValidate = (val) => {
    if (Number(val) <= usedTrust) return errorMessages.cantRemoveStake;

    if (Number(val) <= 0) return errorMessages.minValueZero;

    if (!val) return errorMessages.required;

    return true;
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-type-light">Adjust this members trust</p>

      <div className="mt-4">
        <Input
          chip="DAI"
          id="amount"
          step="0.01"
          type="number"
          label="Amount"
          placeholder="0.00"
          error={errors.amount}
          ref={register({
            validate: handleValidate,
          })}
        />
      </div>

      <LabelPair
        className="mt-4 mb-2"
        label="New Trust"
        value={amount}
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
  );
};

export default AdjustTrustForm;
