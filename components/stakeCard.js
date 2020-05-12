import { BLOCKS_PER_YEAR } from "constants/variables";
import { useDepositModalToggle, useWithdrawModalToggle } from "contexts/Stake";
import { commify, formatUnits, parseUnits } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import useMemberContract from "hooks/useMemberContract";
import useStakingContract from "hooks/useStakingContract";
import useToast from "hooks/useToast";
import useTokenBalance from "hooks/useTokenBalance";
import useUnionContract from "hooks/useUnionContract";
import { stake } from "lib/contracts/stake";
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
  const [withdrawableStake, setWithdrawableStake] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [upy, setUpy] = useState(0);
  const [rewardsMultiplier, setRewardsMultiplier] = useState(0);

  const [withdrawing, setWithdrawing] = useState(false);

  const unionBalance = useTokenBalance(UNION);

  const addToast = useToast();

  const unionContract = useUnionContract();
  const stakingContract = useStakingContract();
  const memberContract = useMemberContract();

  useAutoEffect(() => {
    let isMounted = true;

    async function fetchStakeData() {
      try {
        if (isMounted) {
          const stakingAmount = await stakingContract.getStakerBalance(
            account,
            DAI
          );
          const creditUsed = await memberContract.getTotalCreditUsed(
            account,
            DAI
          );
          const freezeAmount = await memberContract.getTotalFrozenAmount(
            account,
            DAI
          );
          setTotalStake(parseRes(stakingAmount, 2));
          setUtilizedStake(parseRes(creditUsed, 2));
          setDefaultedStake(parseRes(freezeAmount, 2));
          setWithdrawableStake(
            Number(parseRes(stakingAmount) - parseRes(creditUsed)).toFixed(2)
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
          const userBlockDelta = await unionContract.getUserBlockDelta(
            account,
            DAI
          );
          let blocks;
          if (userBlockDelta > BLOCKS_PER_YEAR[chainId]) {
            blocks = userBlockDelta;
          } else {
            blocks = BLOCKS_PER_YEAR[chainId] - userBlockDelta;
          }

          const rewardsPerYearRes = await unionContract.calculateRewardsByBlocks(
            account,
            DAI,
            blocks
          );

          const getRewardsMultiplier = await unionContract.getRewardsMultiplier(
            account,
            DAI
          );
          const calcRewards = await unionContract.calculateRewards(
            account,
            DAI
          );

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
      addToast("Transaction failed", { type: "error", hideAfter: 20 });
    }
  });

  const onWithdraw = useAutoCallback(async (input) => {
    try {
      const amount = parseUnits(input, 18).toString();

      const tx = await stakingContract.unstake(DAI, amount);

      await tx.wait();
    } catch (err) {
      console.error(err);
      addToast("Transaction failed", { type: "error", hideAfter: 20 });
    }
  });

  const onWithdrawRewards = useAutoCallback(async () => {
    setWithdrawing(true);

    try {
      const tx = await unionContract.withdrawRewards(account, DAI);

      await tx.wait();

      setWithdrawing(false);
    } catch (err) {
      console.error(err);
      addToast("Transaction failed", { type: "error", hideAfter: 20 });
      setWithdrawing(false);
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
        slot={
          <button
            onClick={onWithdrawRewards}
            className="text-sm font-semibold underline focus:outline-none"
            disabled={withdrawing}
          >
            {withdrawing ? "Withdrawing Rewards..." : "Withdraw Rewards"}
          </button>
        }
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
