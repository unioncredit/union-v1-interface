import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useForm } from "react-hook-form";

import { Dai } from "components-ui";
import { Button, InputRow, Input } from "union-ui";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import useStakeDeposit from "hooks/payables/useStakeDeposit";
import errorMessages from "util/errorMessages";
import { roundDown } from "util/numbers";
import activityLabels from "util/activityLabels";
import { useAddActivity } from "hooks/data/useActivity";

export const DepositInput = ({ totalStake, onComplete }) => {
  const { library } = useWeb3React();
  const addActivity = useAddActivity();

  const { handleSubmit, register, watch, setValue, formState, errors, reset } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
    });

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
      addActivity(activityLabels.borrow({ amount: values.amount, hash }));
      await onComplete();
      reset();
    } catch (err) {
      addActivity(activityLabels.borrow({ amount: values.amount }, true));
      handleTxError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputRow mt="20px">
        <Input
          type="number"
          name="amount"
          label="Amount to deposit"
          caption={
            <>
              <Dai value={daiBalance} /> Available
            </>
          }
          onCaptionClick={handleMaxDeposit}
          placeholder="0"
          suffix="DAI"
          error={errors?.amount?.message}
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
