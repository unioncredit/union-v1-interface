import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useForm } from "react-hook-form";

import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import useStakeDeposit from "hooks/payables/useStakeDeposit";
import errorMessages from "util/errorMessages";
import { roundDown } from "util/numbers";
import { Button, InputRow, Input } from "union-ui";

export const DepositInput = ({ totalStake, onComplete }) => {
  const { library } = useWeb3React();

  const { handleSubmit, register, watch, setValue, formState } = useForm();

  const { isDirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const DAI = useCurrentToken();

  const { data: daiBalance = 0.0, mutate: updateDaiBalance } =
    useTokenBalance(DAI);

  useEffect(() => {
    updateDaiBalance();
  }, []);

  const flooredDaiBalance = roundDown(daiBalance);
  const maxAllowed = Math.min(500 - parseFloat(totalStake), flooredDaiBalance);
  const newTotalStake = Number(
    parseFloat(amount || 0) + parseFloat(totalStake)
  );

  const handleMaxDeposit = () => {
    setValue("amount", maxAllowed, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const deposit = useStakeDeposit();

  const onSubmit = async (values) => {
    try {
      const { hash } = await deposit(values.amount);
      await getReceipt(hash, library);
      await onComplete();
    } catch (err) {
      handleTxError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputRow mt="20px">
        <Input
          type="number"
          name="amount"
          label="Amout to deposit"
          caption={`${daiBalance} DAI Available`}
          onCaptionClick={handleMaxDeposit}
          placeholder="0"
          suffix="DAI"
          cta={
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!isDirty || newTotalStake > 500}
              label="Deposit"
            />
          }
          ref={register({
            required: errorMessages.required,
            max: {
              value: maxAllowed,
              message: errorMessages.stakeLimitHit,
            },
            min: {
              value: 0.01,
              message: errorMessages.minValuePointZeroOne,
            },
          })}
        />
      </InputRow>
    </form>
  );
};
