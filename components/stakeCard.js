import { TOKENS } from "@constants/index";
import { useDepositModalToggle, useWithdrawModalToggle } from "@contexts/Stake";
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

  const [totalStake, setTotalStake] = useState("N/A");
  const [utilizedStake, setUtilizedStake] = useState("N/A");
  const [defaultedStake, setDefaultedStake] = useState("N/A");
  const [withdrawableStake, setWithdrawableStake] = useState("N/A");
  const [rewards, setRewards] = useState("N/A");
  const [upy, setUpy] = useState("N/A");
  const [rewardsMultiplier, setRewardsMultiplier] = useState(0);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (library && account) {
      getStakeData();
      getRewardData();
      getUpyData();
      getRewardsMultiplierData();
      setSigner(library.getSigner());
    }
  }, [library, account]);

  const getStakeData = async () => {
    const res = await getStakeAmount(
      account,
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setTotalStake(res.stakingAmount);
    setUtilizedStake(res.lendingAmount);
    setDefaultedStake(res.freezeAmount);
    setWithdrawableStake(res.stakingAmount.sub(res.vouchingAmount));
  };

  const getRewardData = async () => {
    const res = await getRewards(TOKENS[chainId]["DAI"], library, chainId);
    setRewards(res);
  };

  const getUpyData = async () => {
    const res = await getSupplyPerYear(
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setUpy(res);
  };

  const getRewardsMultiplierData = async () => {
    const res = await getRewardsMultiplier(
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setRewardsMultiplier(res);
  };

  const onDeposit = async (amount) => {
    await stake(TOKENS[chainId]["DAI"], amount, signer, chainId);
  };

  const onWithdraw = async (amount) => {
    await unstake(TOKENS[chainId]["DAI"], amount, signer, chainId);
  };

  /**
   * @todo move format to LabelPair component as a prop
   */
  const stakeCardData = {
    totalStake: `${totalStake} DAI`,
    utilizedStake: `${utilizedStake} DAI`,
    defaultedStake: `${defaultedStake} DAI`,
    withdrawableStake: `${withdrawableStake} DAI`,
    rewardsMultiplier: `${rewardsMultiplier}x`,
    rewards: `${rewards} UNION`,
    upy: `${upy} UNION`,
  };

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-4 md:p-6">
      <LabelPair
        label="Your total stake"
        value={totalStake}
        className="mb-4"
        large
      />

      <LabelPair
        className="text-grey-pure"
        label="Utilized Stake"
        tooltip={placeholderTip}
        value={utilizedStake}
      />
      <LabelPair
        className="text-grey-pure"
        label="Defaulted Stake"
        tooltip={placeholderTip}
        value={defaultedStake}
      />
      <LabelPair
        className="text-grey-pure"
        label="Withdrawable Stake"
        tooltip={placeholderTip}
        value={withdrawableStake}
      />

      <LabelPair
        label="Rewards multiplier"
        value={rewardsMultiplier}
        className="mb-4 mt-12"
        large
      />

      <LabelPair
        className="text-grey-pure"
        label="Rewards"
        tooltip={placeholderTip}
        value={rewards}
      />
      <LabelPair
        className="text-grey-pure"
        label="UNION Per Year (est.)"
        tooltip={placeholderTip}
        value={upy}
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
