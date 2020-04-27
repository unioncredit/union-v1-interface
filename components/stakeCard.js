import { useDepositModalToggle, useWithdrawModalToggle } from "@contexts/Stake";
import { commify, formatUnits, parseUnits } from "@ethersproject/units";
import useCurrentToken from "@hooks/useCurrentToken";
import useUnionContract from "@hooks/useUnionContract";
import useStakingContract from "@hooks/useStakingContract";
import useTokenBalance from "@hooks/useTokenBalance";
import { BLOCKS_PER_YEAR } from "@constants/";
import { stake } from "@lib/contracts/stake";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import { useState } from "react";
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

const parseRes = (res, decimals = 2) =>
  Number(formatUnits(res, 18)).toFixed(decimals);

const StakeCard = () => {
  const { account, library, chainId } = useWeb3React();

  const toggleDepositModal = useDepositModalToggle();
  const toggleWithdrawModal = useWithdrawModalToggle();

  const DAI = useCurrentToken();
  const UNION = useCurrentToken("UNION");

  const [totalStake, setTotalStake] = useState(0);
  const [utilizedStake, setUtilizedStake] = useState(0);
  const [defaultedStake, setDefaultedStake] = useState(0);
  const [balance, setBalance] = useState(0);
  const [withdrawableStake, setWithdrawableStake] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [upy, setUpy] = useState(0);
  const [rewardsMultiplier, setRewardsMultiplier] = useState(0);

  const unionBalance = useTokenBalance(UNION);

  const unionContract = useUnionContract();

  const stakingContract = useStakingContract();

  useAutoEffect(() => {
    let isMounted = true;

    async function fetchUnionBalance() {
      try {
        if (isMounted) {
          setBalance(await unionBalance);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    }

    async function fetchStakeData() {
      try {
        if (isMounted) {
          const {
            stakingAmount,
            creditUsed,
            freezeAmount,
            vouchingAmount,
          } = await stakingContract.getStakerBalance(account, DAI);

          setTotalStake(parseRes(stakingAmount, 0));
          setUtilizedStake(parseRes(creditUsed, 0));
          setDefaultedStake(parseRes(freezeAmount, 0));
          setWithdrawableStake(
            Number(parseRes(stakingAmount) - parseRes(vouchingAmount))
          );
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    }

    async function fetchRewardsData() {
      try {
        if (isMounted && account) {
          const userBlockDelta = await unionContract.getUserBlockDelta(account, DAI);
          let blocks;
          if (userBlockDelta > BLOCKS_PER_YEAR[chainId]) {
            blocks = userBlockDelta;
          } else {
            blocks = BLOCKS_PER_YEAR[chainId] - userBlockDelta;
          }

          const rewardsPerYearRes = await unionContract.calculateRewardsByBlocks(
            account, DAI, blocks
          );

          const getRewardsMultiplier = await unionContract.getRewardsMultiplier(
            account, DAI
          );
          const calcRewards = await unionContract.calculateRewards(account, DAI);

          setRewards(parseRes(calcRewards, 3));
          setUpy(commify(parseRes(rewardsPerYearRes)));
          setRewardsMultiplier(parseRes(getRewardsMultiplier));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    }

    fetchUnionBalance();
    fetchStakeData();
    fetchRewardsData();

    return () => {
      isMounted = false;
    };
  });

  const onDeposit = useAutoCallback(async (amount) => {
    try {
      await stake(DAI, amount, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  });

  const onWithdraw = useAutoCallback(async (input) => {
    try {
      const amount = parseUnits(input, 18).toString();

      await stakingContract.unstake(DAI, amount);
    } catch (err) {
      console.error(err);
    }
  });

  const onWithdrawRewards = useAutoCallback(async () => {
    try {
      await unionContract.withdrawRewards(DAI);
    } catch (err) {
      console.error(err);
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
        value={balance}
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
      <div className="mt-4">
        <Button invert full onClick={onWithdrawRewards}>
          Withdraw Rewards
        </Button>
      </div>

      <DepositModal
        totalStake={totalStake}
        rewardsMultiplier={rewardsMultiplier}
        onDeposit={onDeposit}
      />
      <WithdrawModal totalStake={totalStake} onWithdraw={onWithdraw} />
    </div>
  );
};

export default StakeCard;
