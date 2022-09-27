import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { Button, Dai, Box, Input, Label } from "@unioncredit/ui";

import { Approval } from "components-ui";
import isHash from "util/isHash";
import format from "util/formatValue";
import { roundDown, toFixed } from "util/numbers";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import errorMessages from "util/errorMessages";
import activityLabels from "util/activityLabels";
import useToken from "hooks/useToken";
import usePermits from "hooks/usePermits";
import useTokenBalance from "hooks/data/useTokenBalance";
import useStakeDeposit from "hooks/payables/useStakeDeposit";
import { useAddActivity } from "hooks/data/useActivity";
import useUserManager from "hooks/contracts/useUserManager";
import useMaxStakeAmount from "hooks/data/useMaxStakeAmount";
import { ZERO } from "constants/variables";
import { APPROVE_DAI_DEPOSIT_SIGNATURE_KEY } from "constants/app";

export const DepositInput = ({ totalStake, utilizedStake, onComplete }) => {
  const DAI = useToken("DAI");
  const deposit = useStakeDeposit();
  const addActivity = useAddActivity();
  const userManager = useUserManager(DAI);

  const { library } = useWeb3React();
  const { removePermit } = usePermits();
  const { data: maxStake = ZERO } = useMaxStakeAmount();
  const { data: daiBalance = ZERO, mutate: updateDaiBalance } =
    useTokenBalance(DAI);

  useEffect(() => {
    updateDaiBalance();
  }, []);

  const { handleSubmit, register, watch, setValue, formState, reset } = useForm(
    {
      mode: "onChange",
      reValidateMode: "onChange",
    }
  );

  const { isDirty, isSubmitting, errors } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const maxAllowed = maxStake.sub(totalStake);
  const maxUserStake = maxAllowed.lt(daiBalance) ? maxAllowed : daiBalance;
  const maxUserStakeView = format(roundDown(formatUnits(maxUserStake)), 2);

  const handleMaxDeposit = () => {
    setValue("amount", roundDown(formatUnits(maxUserStake)), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

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

  const validate = (amount) => {
    if (!amount || amount <= 0) return errorMessages.required;
    if (amount < 0.1) return errorMessages.minValuePointZeroOne;

    const bnValue = parseUnits(String(amount));
    if (bnValue.gt(maxAllowed)) return errorMessages.stakeLimitHit;
    if (bnValue.gt(daiBalance)) return errorMessages.notEnoughBalanceDAI;
  };

  const isOverLimit = errors?.amount?.message === errorMessages.stakeLimitHit;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mt="18px" direction="vertical">
        <Input
          type="number"
          label="Amount to stake"
          caption={`Max. ${maxUserStakeView} DAI`}
          onCaptionClick={handleMaxDeposit}
          placeholder="0"
          suffix={<Dai />}
          error={errors?.amount?.message}
          {...register("amount", { validate })}
        />
      </Box>

      <Box justify="space-between" mt="8px" mb="4px">
        <Label as="p" grey={400}>
          Currently Staked
        </Label>
        <Label as="p" grey={700} m={0}>
          {format(formatUnits(totalStake, 18), 2)} DAI
        </Label>
      </Box>
      <Box justify="space-between" mb="4px">
        <Label as="p" grey={400}>
          Utilized Stake
        </Label>
        <Label as="p" grey={700} m={0}>
          {format(formatUnits(utilizedStake, 18), 2)} DAI
        </Label>
      </Box>
      <Box justify="space-between" mb="18px">
        <Label as="p" color={isOverLimit ? "red500" : "grey400"}>
          Staking Limit
        </Label>
        <Label as="p" color={isOverLimit ? "red500" : "grey700"}>
          {format(formatUnits(maxStake, 18), 2)} DAI
        </Label>
      </Box>

      <Box mt="18px" fluid>
        <Approval
          amount={amount}
          tokenAddress={DAI}
          spender={userManager?.address}
          label="Approve DAI for Staking"
          signatureKey={APPROVE_DAI_DEPOSIT_SIGNATURE_KEY}
        >
          <Button
            fluid
            type="submit"
            loading={isSubmitting}
            disabled={!isDirty}
            label={`Stake ${amount} DAI`}
          />
        </Approval>
      </Box>
    </form>
  );
};
