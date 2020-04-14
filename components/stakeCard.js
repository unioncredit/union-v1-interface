import { useDepositModalToggle, useWithdrawModalToggle } from "@contexts/Stake";
import useCurrentToken from "@hooks/useCurrentToken";
import { getRewards } from "@lib/contracts/getRewards";
import { getRewardsMultiplier } from "@lib/contracts/getRewardsMultiplier";
import { getStakeAmount } from "@lib/contracts/getStakeAmount";
import { getSupplyPerYear } from "@lib/contracts/getSupplyPerYear";
import { stake } from "@lib/contracts/stake";
import { unstake } from "@lib/contracts/unstake";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { placeholderTip } from "../text/tooltips";
import Button from "./button";
import DepositModal from "./depositModal";
import LabelPair from "./labelPair";
import WithdrawModal from "./withdrawModal";

const StakeCard = () => {
  const toggleDepositModal = useDepositModalToggle();
  const toggleWithdrawModal = useWithdrawModalToggle();
  const { account, library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const [totalStake, setTotalStake] = useState(0);
  const [utilizedStake, setUtilizedStake] = useState(0);
  const [defaultedStake, setDefaultedStake] = useState(0);
  const [withdrawableStake, setWithdrawableStake] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [upy, setUpy] = useState(0);
  const [rewardsMultiplier, setRewardsMultiplier] = useState(0);

  useEffect(() => {
    if (library && account) {
      getStakeData();
      getRewardData();
      getUpyData();
      getRewardsMultiplierData();
    }
  }, [library, account, chainId]);

  const getStakeData = async () => {
    const res = await getStakeAmount(account, curToken, library, chainId);
    setTotalStake(res.stakingAmount);
    setUtilizedStake(res.creditUsed);
    setDefaultedStake(res.freezeAmount);
    setWithdrawableStake(res.stakingAmount - res.vouchingAmount);
  };

  const getRewardData = async () => {
    const res = await getRewards(curToken, library.getSigner(), chainId);
    setRewards(res.toFixed(4));
  };

  const getUpyData = async () => {
    const res = await getSupplyPerYear(curToken, library, chainId);
    setUpy(res.toFixed(2));
  };

  const getRewardsMultiplierData = async () => {
    const res = await getRewardsMultiplier(curToken, library.getSigner(), chainId);
    setRewardsMultiplier(res);
  };

  const onDeposit = async (amount) => {
    await stake(curToken, amount, library.getSigner(), chainId);
  };

  const onWithdraw = async (amount) => {
    await unstake(curToken, amount, library.getSigner(), chainId);
  };

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-4 md:p-6">
      <LabelPair
        className="mb-4"
        label="Your total stake"
        large
        value={totalStake}
        valueType="DAI"
      />

      <LabelPair
        className="text-grey-pure"
        label="Utilized Stake"
        tooltip={placeholderTip}
        value={utilizedStake}
        valueType="DAI"
      />
      <LabelPair
        className="text-grey-pure"
        label="Defaulted Stake"
        tooltip={placeholderTip}
        value={defaultedStake}
        valueType="DAI"
      />
      <LabelPair
        className="text-grey-pure"
        label="Withdrawable Stake"
        tooltip={placeholderTip}
        value={withdrawableStake}
        valueType="DAI"
      />

      <LabelPair
        className="mb-4 mt-12"
        label="Rewards multiplier"
        large
        value={`${rewardsMultiplier}x`}
      />

      <LabelPair
        className="text-grey-pure"
        label="Rewards"
        tooltip={placeholderTip}
        value={rewards}
        valueType="UNION"
      />
      <LabelPair
        className="text-grey-pure"
        label="UNION Per Year (est.)"
        tooltip={placeholderTip}
        value={upy}
        valueType="UNION"
      />
      <div className="flex -mx-3 mt-10">
        <div className="flex-1 px-3">
          <Button secondary full onClick={toggleDepositModal}>
            Deposit
          </Button>
        </div>
        <div className="flex-1 px-3">
          <Button invert full onClick={toggleWithdrawModal}>
            Withdraw
          </Button>
        </div>
      </div>

      <DepositModal totalStake={totalStake} onDeposit={onDeposit} />
      <WithdrawModal totalStake={totalStake} onWithdraw={onWithdraw} />
    </div>
  );
};

export default StakeCard;
