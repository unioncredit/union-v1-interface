import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useDepositModalToggle, useWithdrawModalToggle } from "contexts/Stake";
import { useAutoCallback } from "hooks.macro";
import { useRewardsData, useStakeData } from "hooks/swrHooks";
import useCurrentToken from "hooks/useCurrentToken";
import useStakingContract from "hooks/useStakingContract";
import useToast from "hooks/useToast";
import useTokenBalance from "hooks/useTokenBalance";
import { stake } from "lib/contracts/stake";
import {
  defaultedStakeTip,
  rewardsTip,
  unionPerYearTip,
  utilizedStakeTip,
  withdrawableStakeTip,
} from "../text/tooltips";
import Button from "./button";
import DepositModal from "./depositModal";
import LabelPair from "./labelPair";
import WithdrawModal from "./withdrawModal";
import WithdrawRewards from "./withdrawRewards";

const StakeCard = () => {
  const { library, chainId } = useWeb3React();

  const toggleDepositModal = useDepositModalToggle();
  const toggleWithdrawModal = useWithdrawModalToggle();

  const DAI = useCurrentToken();
  const UNION = useCurrentToken("UNION");

  const { data: stakeData, mutate: updateStakeData } = useStakeData();

  const { data: rewardsData, mutate: updateRewardsData } = useRewardsData();

  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);

  const addToast = useToast();

  const stakingContract = useStakingContract();

  const {
    totalStake = 0,
    utilizedStake = 0,
    defaultedStake = 0,
    withdrawableStake = 0,
  } = !!stakeData && stakeData;

  const { upy = 0, rewards = 0, rewardsMultiplier = "0.00" } =
    !!rewardsData && rewardsData;

  const onComplete = () => {
    updateStakeData();
    updateRewardsData();
  };

  const onDeposit = useAutoCallback(async (amount) => {
    try {
      await stake(DAI, amount, library.getSigner(), chainId);

      onComplete();
    } catch (err) {
      console.error(err);
      addToast("Transaction failed", { type: "error", hideAfter: 20 });
    }
  });

  const onWithdraw = useAutoCallback(async (input) => {
    try {
      const amount = parseUnits(input, 18).toString();

      const tx = await stakingContract.unstake(DAI, amount);

      await tx.wait();

      onComplete();
    } catch (err) {
      console.error(err);
      addToast("Transaction failed", { type: "error", hideAfter: 20 });
    }
  });

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-6">
      <LabelPair
        className="mb-4"
        label="Your total stake"
        large
        value={totalStake}
        valueType="DAI"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Utilized Stake"
        tooltip={utilizedStakeTip}
        value={utilizedStake}
        valueType="DAI"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Defaulted Stake"
        tooltip={defaultedStakeTip}
        value={defaultedStake}
        valueType="DAI"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Withdrawable Stake"
        tooltip={withdrawableStakeTip}
        value={withdrawableStake}
        valueType="DAI"
      />
      <LabelPair
        className="mb-4 mt-16"
        label="Rewards multiplier"
        large
        value={`${rewardsMultiplier}x`}
        slot={<WithdrawRewards onComplete={onComplete} />}
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Rewards"
        tooltip={rewardsTip}
        value={rewards}
        valueType="UNION"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Earned Per Year"
        tooltip={unionPerYearTip}
        value={upy}
        valueType="UNION"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Wallet Balance"
        value={Number(unionBalance).toFixed(3)}
        valueType="UNION"
      />

      <div className="flex -mx-2 mt-12">
        <div className="flex-1 px-2">
          <Button secondary full onClick={toggleDepositModal}>
            Deposit
          </Button>
        </div>
        <div className="flex-1 px-2">
          <Button invert full onClick={toggleWithdrawModal}>
            Withdraw
          </Button>
        </div>
      </div>

      <DepositModal
        totalStake={totalStake}
        rewardsMultiplier={rewardsMultiplier}
        onDeposit={onDeposit}
      />
      <WithdrawModal
        totalStake={totalStake}
        withdrawableStake={withdrawableStake}
        onWithdraw={onWithdraw}
      />
    </div>
  );
};

export default StakeCard;
