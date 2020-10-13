import GovernanceProposal, {
  GovernanceProposalSkeleton,
} from "components/governance/GovernanceProposal";
import useUserProposalVoteHistory from "hooks/governance/useUserProposalVoteHistory";
import { Fragment } from "react";

const GovernanceVotingHistory = ({ address }) => {
  const { data } = useUserProposalVoteHistory(address);

  const hasVoted = data && data.length > 0;

  return (
    <div className="bg-white rounded border">
      <div className="p-2">
        {hasVoted ? (
          data.map((proposal, i) => {
            const formatVote = proposal.receipt.hasVoted
              ? proposal.receipt.support
                ? "For"
                : "Against"
              : "No Vote";

            return (
              <GovernanceProposal key={i} {...proposal} vote={formatVote} />
            );
          })
        ) : (
          <Fragment>
            <GovernanceProposalSkeleton />
            <GovernanceProposalSkeleton />
            <GovernanceProposalSkeleton />
            <GovernanceProposalSkeleton />
            <GovernanceProposalSkeleton />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default GovernanceVotingHistory;
