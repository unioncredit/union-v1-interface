import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { Button, Dai, Box, Input } from "@unioncredit/ui";

import { Approval } from "components-ui";
import isHash from "util/isHash";
import format from "util/formatValue";
import { toFixed } from "util/numbers";
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

export const DepositInput = ({ totalStake, onComplete }) => {
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
  const maxDeposit = daiBalance.lt(maxAllowed) ? daiBalance : maxAllowed;
  const maxDepositView = format(formatUnits(maxDeposit, 18), 2);

  const handleMaxDeposit = () => {
    setValue("amount", maxDepositView, {
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

    const scaled = String(toFixed(amount * 10 ** 18));
    const bnValue = BigNumber.from(scaled);
    if (bnValue.add(totalStake).gt(maxAllowed))
      return errorMessages.stakeLimitHit;
    if (bnValue.gt(daiBalance)) return errorMessages.notEnoughBalanceDAI;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mt="18px" direction="vertical">
        <Input
          type="number"
          label="Amount to stake"
          caption={`Max. ${maxDepositView} DAI`}
          onCaptionClick={handleMaxDeposit}
          placeholder="0"
          suffix={<Dai />}
          error={errors?.amount?.message}
          {...register("amount", { validate })}
        />
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
