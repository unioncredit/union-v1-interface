import { commify } from "@ethersproject/units";
import Tooltip from "@reach/tooltip";
import Badge from "components/Badge";
import Button from "components/button";
import { ViewDelegated } from "components/DelegatedModal";
import { ViewDelegateVoting } from "components/DelegateVotingModal";
import WithdrawRewards from "components/withdrawRewards";
import useGovernanceTokenSupply from "hooks/governance/useGovernanceTokenSupply";
import useUserGovernanceTokenBalance from "hooks/governance/useUserGovernanceTokenBalance";
import useUserVotes from "hooks/governance/useUserVotes";
import Info from "svgs/Info";
import { toPercent } from "util/numbers";

/**
 * @name VotingWalletRow
 * @param {object} props
 * @param {number} props.label
 * @param {string} props.value
 * @param {any} props.slotTopRight
 * @param {any} props.slotBottomRight
 */
const VotingWalletRow = ({
  label,
  value,
  slotTopRight = null,
  slotBottomRight = null,
}) => {
  return (
    <div className="border-b pb-4">
      <div className="flex justify-between items-center">
        <p className="text-type-light leading-tight">{label}</p>
        {slotTopRight}
      </div>

      {/* Spacer */}
      <div className="h-2" />

      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold leading-tight">{value}</p>
        {slotBottomRight}
      </div>
    </div>
  );
};

/**
 * @name PercentOfTotalBadge
 *
 * @param {object} props
 * @param {number} props.value
 */
const PercentOfTotalBadge = ({ value }) => {
  return (
    <Tooltip label="Percent of Total Tooltip">
      <div className="flex items-center space-x-2">
        <Info />
        <Badge label={`${toPercent(value, 1)} of total`} />
      </div>
    </Tooltip>
  );
};

const GovernanceVotingWallet = ({ address }) => {
  const { data: currentVotes = 0 } = useUserVotes(address);
  const { data: totalSupply = 0 } = useGovernanceTokenSupply();
  const { data: tokenBalance = 0 } = useUserGovernanceTokenBalance(address);
  const { data: unclaimedUnion = 0 } = { data: undefined };

  const votePowerPercent = currentVotes / totalSupply;

  const votesDelegated = currentVotes - tokenBalance;

  return (
    <div className="bg-white rounded border p-4 sm:p-6">
      <div className="space-y-4">
        <VotingWalletRow
          label="Wallet balance"
          value={`${commify(tokenBalance.toFixed(4))} UNION`}
        />
        <VotingWalletRow
          label="Votes delegated to you"
          value={`${commify(votesDelegated.toFixed(4))} votes`}
          slotBottomRight={<ViewDelegated />}
        />
        <VotingWalletRow
          label="Total voting power"
          value={`${commify(currentVotes.toFixed(4))} votes`}
          slotTopRight={<PercentOfTotalBadge value={votePowerPercent} />}
        />
        <VotingWalletRow
          label="Unclaimed balance"
          value={`${commify(unclaimedUnion.toFixed(4))} UNION`}
          slotBottomRight={<WithdrawRewards />}
        />
        <VotingWalletRow
          label="Delegating to"
          value={"Self"}
          slotBottomRight={<ViewDelegateVoting />}
        />
      </div>
      <div className="mt-8">
        <Button invert full>
          Create a proposal
        </Button>
      </div>
    </div>
  );
};

export default GovernanceVotingWallet;
