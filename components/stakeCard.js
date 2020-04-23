import { useDepositModalToggle, useWithdrawModalToggle } from "@contexts/Stake";
import useCurrentToken from "@hooks/useCurrentToken";
import useStakingContract from "@hooks/useStakingContract";
import useTokenBalance from "@hooks/useTokenBalance";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import { useState } from "react";
import { placeholderTip } from "../text/tooltips";
import Button from "./button";
import DepositModal from "./depositModal";
import LabelPair from "./labelPair";
import WithdrawModal from "./withdrawModal";
import { parseUnits } from "@ethersproject/units";

const parseRes = (res) => parseFloat((res / 1e18).toString());

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

  const stakingContract = useStakingContract();

  useAutoEffect(() => {
    let isMounted = true;

    async function fetchUnionBalance() {
      try {
        if (isMounted) {
          const unionBalanceRes = await unionBalance;

          setBalance(unionBalanceRes.toFixed(3));
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

          setTotalStake(parseRes(stakingAmount));
          setUtilizedStake(parseRes(creditUsed));
          setDefaultedStake(parseRes(freezeAmount));
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
        if (isMounted) {
          const rewardsPerYearRes = await stakingContract.rewardsPerYearEst(
            DAI
          );
          const getRewardsMultiplier = await stakingContract.getRewardsMultiplier(
            DAI
          );
          const calcRewards = await stakingContract.calculateRewards(DAI);

          setRewards(parseRes(calcRewards).toFixed(3));
          setUpy(parseRes(rewardsPerYearRes).toFixed(2));
          setRewardsMultiplier(parseRes(getRewardsMultiplier).toFixed(2));
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
      await stakingContract.withdrawRewards(DAI);
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
        tooltip={placeholderTip}
        value={utilizedStake}
        valueType="DAI"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Defaulted Stake"
        tooltip={placeholderTip}
        value={defaultedStake}
        valueType="DAI"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Withdrawable Stake"
        tooltip={placeholderTip}
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
        tooltip={placeholderTip}
        value={rewards}
        valueType="UNION"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Earned Per Year"
        tooltip={placeholderTip}
        value={upy}
        valueType="UNION"
      />
      <LabelPair
        labelColor="text-grey-pure"
        label="Wallet Balance"
        tooltip={placeholderTip}
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
