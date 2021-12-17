import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { Button, Dai, Box, Input } from "union-ui";

import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import useStakeDeposit from "hooks/payables/useStakeDeposit";
import errorMessages from "util/errorMessages";
import { roundDown } from "util/numbers";
import activityLabels from "util/activityLabels";
import { useAddActivity } from "hooks/data/useActivity";
import isHash from "util/isHash";
import { Approval } from "components-ui";
import useUserContract from "hooks/contracts/useUserContract";
import useMaxStakeAmount from "hooks/data/useMaxStakeAmount";
import { APPROVE_DAI_DEPOSIT_SIGNATURE_KEY } from "constants/app";
import usePermits from "hooks/usePermits";
import { formatEther } from "@ethersproject/units";

export const DepositInput = ({ totalStake, onComplete }) => {
  const { library } = useWeb3React();
  const addActivity = useAddActivity();
  const userManager = useUserContract();
  const { removePermit } = usePermits();
  const { data: maxStake = "0" } = useMaxStakeAmount();

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

  const maxStakeAmount = Number(formatEther(maxStake));
  const maxAllowed = maxStakeAmount - parseFloat(totalStake);
  const maxDeposit = Math.min(maxAllowed, roundDown(daiBalance));
  const newTotalStake = Number(
    parseFloat(amount || 0) + parseFloat(totalStake)
  );

  const handleMaxDeposit = () => {
    setValue("amount", maxDeposit, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const deposit = useStakeDeposit();

  const onSubmit = async (values) => {
    try {
      const { hash } = await deposit(values.amount);
      await getReceipt(hash, library, {
        pending: `Staking ${values.amount} DAI`,
        success: `Staked ${values.amount} DAI`,
      });
      addActivity(activityLabels.borrow({ amount: values.amount, hash }));
      await onComplete();
      removePermit(APPROVE_DAI_DEPOSIT_SIGNATURE_KEY);
      reset();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.borrow({ amount: values.amount, hash }, true));
      handleTxError(err, `Failed to stake ${values.amount} DAI`);
    }
  };

  const validateAmount = (amount) => {
    if (!amount || amount <= 0) return errorMessages.required;
    if (amount > maxAllowed) return errorMessages.stakeLimitHit;
    if (amount > daiBalance) return errorMessages.notEnoughBalanceDAI;
    if (amount < 0.1) return errorMessages.minValuePointZeroOne;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mt="18px" direction="vertical">
        <Input
          type="number"
          name="amount"
          label="Amount to stake"
          caption={`Max. ${maxDeposit} DAI`}
          onCaptionClick={handleMaxDeposit}
          placeholder="0"
          suffix={<Dai />}
          error={errors?.amount?.message}
          ref={register({ validate: validateAmount })}
        />
      </Box>
      <Box mt="18px" fluid>
        <Approval
          amount={amount}
          tokenAddress={DAI}
          spender={userManager.address}
          label="Approve DAI for Staking"
          signatureKey={APPROVE_DAI_DEPOSIT_SIGNATURE_KEY}
        >
          <Button
            fluid
            type="submit"
            loading={isSubmitting}
            disabled={!isDirty || newTotalStake > maxStakeAmount}
            label={`Stake ${amount} DAI`}
          />
        </Approval>
      </Box>
    </form>
  );
};
