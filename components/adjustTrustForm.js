import { useWeb3React } from "@web3-react/core";
import SegmentedControl from "components/segmentedControl";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import { useState } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";

const ADJUST_TYPES = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
};

const AdjustTrustForm = ({ address, vouched, onComplete }) => {
  const { library } = useWeb3React();

  const { register, handleSubmit, watch, formState, errors } = useForm();

  const { isSubmitting, isDirty } = formState;

  const [adjustType, setAdjustType] = useState(ADJUST_TYPES.INCREASE);

  const amount = watch("amount", 0);

  const adjustTrust = useAdjustTrust();

  const formatNewTrust = Number(
    parseFloat(vouched) +
      ((adjustType === ADJUST_TYPES.INCREASE ? 1 : -1) * amount || 0)
  );

  const onSubmit = async () => {
    try {
      if (formatNewTrust <= 0) return;

      const { hash } = await adjustTrust(address, formatNewTrust);

      await getReceipt(hash, library);

      await onComplete();
    } catch (err) {
      handleTxError(err);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-type-light">
        How would you like to adjust this members trust?
      </p>

      <SegmentedControl.Wrapper className="mt-4">
        <SegmentedControl.Button
          onClick={() => setAdjustType(ADJUST_TYPES.INCREASE)}
          active={adjustType === ADJUST_TYPES.INCREASE}
          label="Increase trust"
          small
        />
        <SegmentedControl.Button
          onClick={() => setAdjustType(ADJUST_TYPES.DECREASE)}
          active={adjustType === ADJUST_TYPES.DECREASE}
          label="Decrease trust"
          small
        />
      </SegmentedControl.Wrapper>

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
            required: errorMessages.required,
            min: {
              value: 0,
              message: errorMessages.minValueZero,
            },
          })}
        />
      </div>

      <LabelPair
        className="mt-4 mb-2"
        label="New Trust"
        value={formatNewTrust}
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
