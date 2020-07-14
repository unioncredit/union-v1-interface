import { useWeb3React } from "@web3-react/core";
import SegmentedControl from "components/segmentedControl";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import { adjustTrust } from "lib/contracts/adjustTrust";
import { useState } from "react";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";

const ADJUST_TYPES = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
};

const AdjustTrustForm = ({ address, vouched, onComplete }) => {
  const { library, chainId } = useWeb3React();
  const curToken = useCurrentToken("DAI");

  const { register, handleSubmit, watch, formState, errors } = useForm();

  const { isSubmitting, isDirty } = formState;

  const [adjustType, setAdjustType] = useState(ADJUST_TYPES.INCREASE);

  const amount = watch("amount", 0);

  const formatNewTrust = Number(
    parseFloat(vouched) +
      ((adjustType === ADJUST_TYPES.INCREASE ? 1 : -1) * amount || 0)
  );

  const addToast = useToast();

  const onSubmit = async (data, e) => {
    let hidePendingToast = () => {};

    try {
      if (formatNewTrust >= 0) {
        const tx = await adjustTrust(
          address,
          curToken,
          formatNewTrust,
          library.getSigner(),
          chainId
        );

        const { hide: hidePending } = addToast(
          FLAVORS.TX_PENDING(tx.hash, chainId)
        );

        hidePendingToast = hidePending;

        const receipt = await library.waitForTransaction(tx.hash);

        if (receipt.status === 1) {
          hidePending();

          addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));

          onComplete();

          return;
        }

        hidePending();

        throw new Error(receipt.logs[0]);
      }
    } catch (err) {
      hidePendingToast();

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message));
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
            required: "Please fill out this field",
            min: {
              value: 0,
              message: "Value must be greater than 0",
            },
          })}
        />
      </div>

      <div className="mt-8">
        <dl className="flex justify-between items-center leading-tight">
          <dt>New Trust</dt>
          <dd className="text-right text-lg font-semibold">{`${formatNewTrust} DAI`}</dd>
        </dl>
      </div>

      <div className="mt-4">
        <div className="divider" />
      </div>

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
