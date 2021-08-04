import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";

import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import errorMessages from "util/errorMessages";
import useStakeWithdraw from "hooks/payables/useStakeWithdraw";
import { Button, InputRow, Input } from "union-ui";

export const WithdrawInput = ({ withdrawableStake, onComplete }) => {
  const { library } = useWeb3React();
  const { handleSubmit, register, watch, setValue, formState, errors, reset } =
    useForm();

  const { isDirty, isSubmitting } = formState;

  const withdraw = useStakeWithdraw();

  const onSubmit = async (values) => {
    try {
      const { hash } = await withdraw(values.amount);
      await getReceipt(hash, library);
      await onComplete();
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
          type="number"
          name="amount"
          label="Amout to withdraw"
          caption={`${withdrawableStake} DAI Available`}
          onCaptionClick={handleMaxWithdraw}
          placeholder="0"
          suffix="DAI"
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
