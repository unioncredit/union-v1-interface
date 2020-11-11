import { isAddress } from "@ethersproject/address";
import { commify } from "@ethersproject/units";
import Tooltip from "@reach/tooltip";
import Badge from "components/Badge";
import Button from "components/button";
import { ViewDelegateVoting } from "components/governance/DelegateVotingModal";
import { useDelegateVotingModalToggle } from "components/governance/DelegateVotingModal/state";
import Identicon from "components/identicon";
import Skeleton from "components/Skeleton";
import WithdrawRewards from "components/withdrawRewards";
import { AddressZero } from "constants/variables";
import useGovernanceTokenSupply from "hooks/governance/useGovernanceTokenSupply";
import useProposalThreshold from "hooks/governance/useProposalThreshold";
import useUserGovernanceTokenRewards from "hooks/governance/useUserGovernanceTokenRewards";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import Link from "next/link";
import { Fragment } from "react";
import Info from "svgs/Info";
import { toPercent } from "util/numbers";
import truncateAddress from "util/truncateAddress";
import { useChooseDelegationModalToggle } from "../ChooseDelegationModal/state";
import { useCreateProposalModalToggle } from "../CreateProposalModal/state";

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
  className = "border-b pb-4",
}) => {
  return (
    <div className={className}>
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

const SetupVoting = () => {
  const chooseDelegationModalToggle = useChooseDelegationModalToggle();

  return (
    <div>
      <div className="text-xl font-semibold leading-tight">Setup voting</div>

      {/* Spacer */}
      <div className="h-2" />

      <div className="leading-tight text-type-light">
        You can either vote on each proposal yourself or delegate your votes to
        a third party.
      </div>

      {/* Spacer */}
      <div className="h-4" />

      <Button full onClick={chooseDelegationModalToggle}>
        Get started
      </Button>
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
  const { data: votingWalletData } = useVotingWalletData(address);
  const { balanceOf = 0, currentVotes = 0, delegates } =
    !!votingWalletData && votingWalletData;

  const toggleCreateProposalModal = useCreateProposalModalToggle();

  const { data: totalSupply = 0 } = useGovernanceTokenSupply();
  const { data: unclaimedBalance = 0 } = useUserGovernanceTokenRewards(address);
  const { data: proposalThreshold = 0 } = useProposalThreshold();

  const votePowerPercent = currentVotes / totalSupply;

  const votesDelegated = currentVotes > 0 ? currentVotes - balanceOf : 0;

  const notReadyToVote = delegates === AddressZero;

  const canCreateProposal = currentVotes > proposalThreshold;

  return (
    <div className="bg-white rounded border p-4 sm:p-6">
      <div className="space-y-4">
        <VotingWalletRow
          label="Wallet balance"
          value={`${commify(balanceOf.toFixed(4))} UNION`}
        />
        <VotingWalletRow
          label="Votes delegated to you"
          value={`${commify(votesDelegated.toFixed(4))} votes`}
        />
        <VotingWalletRow
          label="Total voting power"
          value={`${commify(currentVotes.toFixed(4))} votes`}
          slotTopRight={<PercentOfTotalBadge value={votePowerPercent} />}
        />
        <VotingWalletRow
          label="Unclaimed balance"
          value={`${commify(unclaimedBalance.toFixed(4))} UNION`}
          slotBottomRight={<WithdrawRewards style="Underline" />}
        />
        {notReadyToVote ? (
          <SetupVoting />
        ) : (
          <VotingWalletRow
            className={canCreateProposal ? "border-b pb-4" : ""}
            label="Delegating to"
            value={delegates && <DisplayDelegating delegates={delegates} />}
            slotBottomRight={<ViewDelegateVoting />}
          />
        )}
      </div>

      {canCreateProposal && (
        <Fragment>
          {/* Spacer */}
          <div className="h-8" />

          <Button invert full onClick={toggleCreateProposalModal}>
            Create proposal
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default GovernanceVotingWallet;

export const GovernanceVotingProfile = ({ address }) => {
  const { data: votingWalletData } = useVotingWalletData(address);
  const { balanceOf = 0, currentVotes = 0, delegates } =
    !!votingWalletData && votingWalletData;

  const { data: threeBoxData } = use3BoxPublicData(address);

  const has3BoxName = Boolean(threeBoxData?.name);

  const votesDelegated = currentVotes > 0 ? currentVotes - balanceOf : 0;

  const delegateVotingModalToggle = useDelegateVotingModalToggle();

  return (
    <div className="bg-white rounded border">
      <div className="p-4 sm:p-6 border-b">
        <div className="flex items-center space-x-4">
          {address ? (
            <Identicon address={address} size={48} />
          ) : (
            <Skeleton width={48} height={48} circle />
          )}
          {has3BoxName ? (
            <div>
              <p className="text-lg font-semibold">{threeBoxData.name}</p>
              <p title={address} className="text-type-light">
                {truncateAddress(address, 6)}
              </p>
            </div>
          ) : address ? (
            <p title={address} className="text-lg font-semibold">
              {truncateAddress(address, 6)}
            </p>
          ) : (
            <p className="text-lg">
              <Skeleton width={160} />
            </p>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          <VotingWalletRow
            label="Wallet balance"
            value={`${commify(balanceOf.toFixed(4))} UNION`}
          />
          <VotingWalletRow
            label="Votes delegated"
            value={`${commify(votesDelegated.toFixed(4))} votes`}
          />
          <VotingWalletRow
            label="Total voting power"
            value={`${commify(currentVotes.toFixed(4))} votes`}
          />
          <VotingWalletRow
            label="Delegating to"
            value={delegates && <DisplayDelegating delegates={delegates} />}
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
