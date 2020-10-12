import { commify } from "@ethersproject/units";
import Tooltip from "@reach/tooltip";
import Badge from "components/Badge";
import Button from "components/button";
import { ViewDelegated } from "components/governance/DelegatedModal";
import { ViewDelegateVoting } from "components/governance/DelegateVotingModal";
import { useDelegateVotingModalToggle } from "components/governance/DelegateVotingModal/state";
import Identicon from "components/identicon";
import Skeleton from "components/Skeleton";
import WithdrawRewards from "components/withdrawRewards";
import useUserDelegateStatus from "hooks/governance/useUserDelegateStatus";
import useGovernanceTokenSupply from "hooks/governance/useGovernanceTokenSupply";
import useUserGovernanceTokenBalance from "hooks/governance/useUserGovernanceTokenBalance";
import useUserVotes from "hooks/governance/useUserVotes";
import Info from "svgs/Info";
import { toPercent } from "util/numbers";
import { isAddress } from "@ethersproject/address";
import truncateAddress from "util/truncateAddress";
import Link from "next/link";
import use3BoxPublicData from "hooks/use3BoxPublicData";

const DisplayDelegating = ({ delegates }) => {
  if (isAddress(delegates))
    return (
      <Link href={`/governance/address/${delegates}`}>
        <a className="underline flex items-center space-x-2">
          <Identicon size={24} address={delegates} />
          <span>{truncateAddress(delegates)}</span>
        </a>
      </Link>
    );

  return delegates;
};

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
        <div className="text-type-light leading-tight">{label}</div>
        {slotTopRight}
      </div>

      {/* Spacer */}
      <div className="h-2" />

      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold leading-tight">
          {value ? value : <Skeleton width={200} />}
        </div>
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
  const { data: delegatingTo } = useUserDelegateStatus(address);
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
          value={delegatingTo && <DisplayDelegating delegates={delegatingTo} />}
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

export const GovernanceVotingProfile = ({ address }) => {
  const { data: currentVotes = 0 } = useUserVotes(address);
  const { data: tokenBalance = 0 } = useUserGovernanceTokenBalance(address);
  const { data: delegatingTo } = useUserDelegateStatus(address);

  const { data: threeBoxData } = use3BoxPublicData(address);

  const has3BoxName = Boolean(threeBoxData?.name);

  const votesDelegated = currentVotes - tokenBalance;

  const delegateVotingModalToggle = useDelegateVotingModalToggle();

  return (
    <div className="bg-white rounded border">
      <div className="p-4 sm:p-6 border-b">
        <div className="flex items-center space-x-4">
          <Identicon address={address} size={48} />

          {has3BoxName ? (
            <div>
              <p className="text-lg font-semibold">{threeBoxData.name}</p>
              <p title={address} className="text-type-light">
                {truncateAddress(address, 6)}
              </p>
            </div>
          ) : (
            <p title={address} className="text-lg font-semibold">
              {truncateAddress(address, 6)}
            </p>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          <VotingWalletRow
            label="Wallet balance"
            value={`${commify(tokenBalance.toFixed(4))} UNION`}
          />
          <VotingWalletRow
            label="Votes delegated"
            value={`${commify(votesDelegated.toFixed(4))} votes`}
            slotBottomRight={<ViewDelegated />}
          />
          <VotingWalletRow
            label="Total voting power"
            value={`${commify(currentVotes.toFixed(4))} votes`}
          />
          <VotingWalletRow
            label="Delegating to"
            value={
              delegatingTo && <DisplayDelegating delegates={delegatingTo} />
            }
          />
        </div>
        <div className="mt-8">
          <Button full onClick={delegateVotingModalToggle}>
            Delegate votes
          </Button>
        </div>
      </div>
    </div>
  );
};
