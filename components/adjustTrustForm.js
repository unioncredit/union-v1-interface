import SegmentedControl from "@components/segmentedControl";
import delay from "@lib/delay";
import { adjustTrust } from "@lib/contracts/adjustTrust";
import useCurrentToken from "@hooks/useCurrentToken";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";

const ADJUST_TYPES = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
};

const AdjustTrustForm = ({ address, vouched, onComplete }) => {
  const { library, chainId } = useWeb3React();
  const curToken = useCurrentToken("DAI");

  const { register, handleSubmit, watch, formState } = useForm();

  const { isSubmitting, dirty } = formState;

  const [adjustType, setAdjustType] = useState(ADJUST_TYPES.INCREASE);

  const amount = watch("amount", 0);

  const onSubmit = async (data, e) => {
    const { amount } = data;
    try {
      if (adjustType === ADJUST_TYPES.INCREASE) {
        /**
         * Variables presumed needed for the calls
         */
        console.log({ address, amount, library, chainId });

        /**
         * Simulate contract call
         */
        await delay();

        //onComplete();
      }

      if (adjustType === ADJUST_TYPES.DECREASE) {
        /**
         * Variables presumed needed for the calls
         */
        console.log({ address, amount, library, chainId });

        /**
         * Simulate contract call
         */
        await delay();

        //onComplete();
      }

      if (formatNewTrust >= 0) {
        await adjustTrust(
          address,
          curToken,
          formatNewTrust,
          library.getSigner(),
          chainId
        );
        onComplete();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatNewTrust = Number(
    vouched + ((adjustType === ADJUST_TYPES.INCREASE ? 1 : -1) * amount || 0)
  );

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
          min={0}
          required
          autoFocus
          chip="DAI"
          id="amount"
          step="0.01"
          type="number"
          label="Amount"
          ref={register}
          placeholder="0.00"
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
          disabled={isSubmitting || !dirty}
        >
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default AdjustTrustForm;
