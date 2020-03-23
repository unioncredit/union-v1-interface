import { useDepositModalToggle, useWithdrawModalToggle } from "@contexts/Stake";
import { placeholderTip } from "../text/tooltips";
import Button from "./button";
import LabelPair from "./labelPair";

const StakeCard = ({}) => {
  /**
   * @todo Hook up to contract
   */
  const data = {
    totalStake: "0 DAI",
    utilizedStake: "0 DAI",
    defaultedStake: "0 DAI",
    withdrawableStake: "0 DAI",
    rewardsMultiplier: "1x",
    rewards: "0 UNION",
    upy: "0 UNION",
  };

  const toggleDepositModal = useDepositModalToggle();
  const toggleWithdrawModal = useWithdrawModalToggle();

  return (
    <div className="bg-primary-100 border border-primary-500 rounded p-4 md:p-6">
      <LabelPair
        label="Your total stake"
        value={data.totalStake}
        className="mb-4"
        large
      />

      <LabelPair
        label="Utilized Stake"
        tooltip={placeholderTip}
        value={data.utilizedStake}
      />
      <LabelPair
        label="Defaulted Stake"
        tooltip={placeholderTip}
        value={data.defaultedStake}
      />
      <LabelPair
        label="Withdrawable Stake"
        tooltip={placeholderTip}
        value={data.withdrawableStake}
      />

      <LabelPair
        label="Rewards multiplier"
        value={data.rewardsMultiplier}
        className="mb-4 mt-12"
        large
      />

      <LabelPair
        label="Rewards"
        tooltip={placeholderTip}
        value={data.rewards}
      />
      <LabelPair
        label="Union Per Year (UPY)"
        tooltip={placeholderTip}
        value={data.upy}
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
    </div>
  );
};

export default StakeCard;
