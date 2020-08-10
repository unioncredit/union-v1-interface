import { useWeb3React } from "@web3-react/core";
import SegmentedControl from "components/segmentedControl";
import useAdjustTrust from "hooks/calls/useAdjustTrust";
import useToast, { FLAVORS } from "hooks/useToast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "text/errorMessages";
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

  const addToast = useToast();

  const onSubmit = async () => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    try {
      if (formatNewTrust >= 0) {
        const tx = await adjustTrust(address, formatNewTrust);

        const { hide: hidePending } = addToast(FLAVORS.TX_PENDING(tx.hash));

        hidePendingToast = hidePending;

        const receipt = await library.waitForTransaction(tx.hash);

        if (receipt.status === 1) {
          hidePending();

          addToast(FLAVORS.TX_SUCCESS(tx.hash));

          onComplete();

          return;
        }

        hidePending();

        txReceipt = receipt;

        throw new Error(receipt.logs[0]);
      }
    } catch (err) {
      hidePendingToast();

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message, txReceipt?.transactionHash));
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
          autoFocus
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
