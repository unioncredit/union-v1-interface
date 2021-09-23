import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";

import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import errorMessages from "util/errorMessages";
import useStakeWithdraw from "hooks/payables/useStakeWithdraw";
import { Button, InputRow, Dai, Input } from "union-ui";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import isHash from "util/isHash";

export const WithdrawInput = ({ withdrawableStake, onComplete }) => {
  const { library } = useWeb3React();
  const addActivity = useAddActivity();
  const { handleSubmit, register, setValue, formState, errors, reset } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
    });

  const { isDirty, isSubmitting } = formState;

  const withdraw = useStakeWithdraw();

  const onSubmit = async (values) => {
    try {
      const { hash } = await withdraw(values.amount);
      await getReceipt(hash, library);
      await onComplete();
      addActivity(activityLabels.withdraw({ amount: values.amount, hash }));
      reset();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(
        activityLabels.withdraw({ amount: values.amount, hash }, true)
      );
      handleTxError(err);
    }
  };

  const handleMaxWithdraw = () => {
    setValue("amount", withdrawableStake, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputRow mt="18px">
        <Input
          type="number"
          ref={register({
            required: errorMessages.required,
            max: {
              value: withdrawableStake,
              message: errorMessages.notEnoughStake,
            },
            min: {
              value: 0.01,
              message: errorMessages.minValuePointZeroOne,
            },
          })}
          name="amount"
          label="Amount to withdraw"
          caption={`Max. ${withdrawableStake} DAI`}
          onCaptionClick={handleMaxWithdraw}
          placeholder="0"
          suffix={<Dai />}
          error={errors?.amount?.message}
        />
      </InputRow>
      <Button
        fluid
        type="submit"
        mt="18px"
        label="Withdraw"
        loading={isSubmitting}
        disabled={!isDirty}
      />
    </form>
  );
};
