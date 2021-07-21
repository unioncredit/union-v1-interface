import useCurrentToken from "hooks/useCurrentToken";
import useRewardsData from "hooks/data/useRewardsData";
import useStakeData from "hooks/data/useStakeData";
import useTokenBalance from "hooks/data/useTokenBalance";
import { Fragment } from "react";
import format from "util/formatValue";
import {
  defaultedStakeTip,
  utilizedStakeTip,
  withdrawableStakeTip,
} from "../util/tooltips";
import Button from "./button";
import DepositModal from "./modals/DepositModal";
import { useDepositModalToggle } from "./modals/DepositModal/state";
import LabelPair from "./labelPair";
import WithdrawModal from "./modals/WithdrawModal";
import { useWithdrawModalToggle } from "./modals/WithdrawModal/state";
import WithdrawRewards from "./withdrawRewards";
import useUnionSymbol from "hooks/useUnionSymbol";

const StakeCard = () => {
  const toggleDepositModal = useDepositModalToggle();
  const toggleWithdrawModal = useWithdrawModalToggle();

  const UNION = useCurrentToken("UNION");
  const { data: unionSymbol } = useUnionSymbol();

  const {
    data: unionBalance = 0.0,
    mutate: updateUnionBalance,
  } = useTokenBalance(UNION);

  const { data: stakeData, mutate: updateStakeData } = useStakeData();

  const { data: rewardsData, mutate: updateRewardsData } = useRewardsData();

  const {
    totalStake = 0.0,
    utilizedStake = 0.0,
    defaultedStake = 0.0,
    withdrawableStake = 0.0,
  } = !!stakeData && stakeData;

  const { rewards = 0.0, rewardsMultiplier = "0.00" } =
    !!rewardsData && rewardsData;

  const onComplete = async () => {
    await updateUnionBalance();
    await updateStakeData();
    await updateRewardsData();
  };

  return (
    <Fragment>
      <div>
        <div className="bg-pink-light border border-pink-pure rounded-t px-6 pt-6 pb-5">
          <LabelPair
            className="mb-4"
            label="Your total stake"
            large
            value={format(totalStake)}
            valueType="DAI"
            valueSlot={
              <div className="text-sm font-inter font-semibold py-1 px-3 leading-tight rounded-full bg-pink-2-pure bg-opacity-25">
                Earning at {rewardsMultiplier}x
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
            tooltip={defaultedStakeTip(unionSymbol)}
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

          <div className="divider bg-pink-pure my-8" />

          <dl className="py-1 flex justify-between items-center">
            <dt className="leading-tight whitespace-no-wrap text-lg mb-2">
              Your {unionSymbol}
            </dt>
            <dd>
              <WithdrawRewards onComplete={onComplete} />
            </dd>
          </dl>

          <LabelPair
            labelColor="text-grey-pure"
            label="Balance"
            value={format(unionBalance, 3)}
            valueType={unionSymbol}
          />
          <LabelPair
            labelColor="text-grey-pure"
            label="Unclaimed"
            value={format(rewards, 3)}
            valueType={unionSymbol}
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
      </div>

      <DepositModal totalStake={totalStake} onComplete={onComplete} />
      <WithdrawModal
        totalStake={totalStake}
        withdrawableStake={withdrawableStake}
        onComplete={onComplete}
      />
    </Fragment>
  );
};

export default StakeCard;
