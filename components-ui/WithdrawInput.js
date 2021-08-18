import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";

import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import errorMessages from "util/errorMessages";
import useStakeWithdraw from "hooks/payables/useStakeWithdraw";
import { Button, InputRow, Input } from "union-ui";

export const WithdrawInput = ({ withdrawableStake, onComplete }) => {
  const { library } = useWeb3React();
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
      reset();
    } catch (err) {
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
      <InputRow mt="20px">
        <Input
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
          label="Amout to withdraw"
          caption={`${withdrawableStake} DAI Available`}
          onCaptionClick={handleMaxWithdraw}
          placeholder="0"
          suffix="DAI"
          error={errors?.amount?.message}
          cta={
            <Button
              type="submit"
              label="Withdraw"
              loading={isSubmitting}
              disabled={!isDirty}
            />
          }
        />
      </InputRow>
    </form>
  );
};
