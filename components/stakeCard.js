import { commify } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import useRewardsData from "hooks/useRewardsData";
import useStakeData from "hooks/useStakeData";
import useTokenBalance from "hooks/useTokenBalance";
import toK from "util/toK";
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

const format = (number, decimals = 2) => {
  if (String(number).length > 8) return toK(number, true, 2);

  return commify(Number(number).toFixed(decimals));
};

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
    <div>
      <div className="bg-pink-light border border-pink-pure rounded-t px-6 pt-6 pb-5">
        <LabelPair
          className="mb-4"
          label="Your total stake"
          large
          value={format(totalStake)}
          valueType="DAI"
          valueSlot={
            <div>
              <div className="text-sm py-1 px-3 leading-tight rounded-full bg-pink-2-pure bg-opacity-25">
                Earning at {rewardsMultiplier}x
              </div>
            </div>
          }
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

        <div className="divider bg-pink-pure my-8"></div>

        <LabelPair
          className="pt-1 mb-4"
          label="Rewards"
          large
          tooltip={rewardsTip}
          value={format(rewards, 3)}
          valueType="UNION"
          valueSlot={<WithdrawRewards onComplete={onComplete} />}
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
      </div>
      <div className="bg-pink-light border border-pink-pure border-t-0 rounded-b p-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Button secondary full onClick={toggleDepositModal}>
              Deposit
            </Button>
          </div>
          <div className="flex-1">
            <Button invert full onClick={toggleWithdrawModal}>
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      <DepositModal totalStake={totalStake} onComplete={onComplete} />
      <WithdrawModal
        totalStake={totalStake}
        withdrawableStake={withdrawableStake}
        onComplete={onComplete}
      />
    </div>
  );
};

export default StakeCard;
