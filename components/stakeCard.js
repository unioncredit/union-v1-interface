import { commify } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import useRewardsData from "hooks/useRewardsData";
import useStakeData from "hooks/useStakeData";
import useTokenBalance from "hooks/useTokenBalance";
import {
  defaultedStakeTip,
  rewardsTip,
  unionPerYearTip,
  utilizedStakeTip,
  withdrawableStakeTip,
} from "../text/tooltips";
import Button from "./button";
import DepositModal from "./DepositModal";
import { useDepositModalToggle } from "./DepositModal/state";
import LabelPair from "./labelPair";
import WithdrawModal from "./WithdrawModal";
import { useWithdrawModalToggle } from "./WithdrawModal/state";
import WithdrawRewards from "./withdrawRewards";

const format = (number, decimals = 2) =>
  commify(Number(number).toFixed(decimals));

const StakeCard = () => {
  const toggleDepositModal = useDepositModalToggle();
  const toggleWithdrawModal = useWithdrawModalToggle();

  const UNION = useCurrentToken("UNION");

  const {
    data: unionBalance = 0.0,
    mutate: updateUnionBalance,
  } = useTokenBalance(UNION);

  const { data: stakeData, mutate: updateStakeData } = useStakeData();

  const { data: rewardsData, mutate: updateRewardsData } = useRewardsData();

  const {
    totalStake = 0,
    utilizedStake = 0,
    defaultedStake = 0,
    withdrawableStake = 0,
  } = !!stakeData && stakeData;

  const { upy = 0.0, rewards = 0.0, rewardsMultiplier = "0.00" } =
    !!rewardsData && rewardsData;

  const onComplete = async () => {
    await updateUnionBalance();
    await updateStakeData();
    await updateRewardsData();
  };

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-6">
      <LabelPair
        className="mb-4"
        label="Your total stake"
        large
        value={format(totalStake)}
        valueType="DAI"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Utilized Stake"
        tooltip={utilizedStakeTip}
        value={format(utilizedStake)}
        valueType="DAI"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Defaulted Stake"
        tooltip={defaultedStakeTip}
        value={format(defaultedStake)}
        valueType="DAI"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Withdrawable Stake"
        tooltip={withdrawableStakeTip}
        value={format(withdrawableStake)}
        valueType="DAI"
      />
      <LabelPair
        className="mb-4 mt-16"
        label="Rewards multiplier"
        large
        value={`${rewardsMultiplier}x`}
        slot={rewards > 0 ? <WithdrawRewards onComplete={onComplete} /> : null}
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Rewards"
        tooltip={rewardsTip}
        value={format(rewards, 3)}
        valueType="UNION"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Earned Per Year"
        tooltip={unionPerYearTip}
        value={format(upy, 3)}
        valueType="UNION"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Wallet Balance"
        value={format(unionBalance, 3)}
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
        onComplete={onComplete}
      />
      <WithdrawModal
        totalStake={totalStake}
        withdrawableStake={withdrawableStake}
        onComplete={onComplete}
      />
    </div>
  );
};

export default StakeCard;
