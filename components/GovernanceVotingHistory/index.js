import GovernanceProposal from "components/GovernanceProposal";
import useUserProposalVoteHistory from "hooks/governance/useUserProposalVoteHistory";

const GovernanceVotingHistory = () => {
  const { data } = useUserProposalVoteHistory();

  const hasVoted = data && data.length > 0;

  return (
    <div className="bg-white rounded border">
      <div className="p-2">
        {hasVoted &&
          data.map((proposal, i) => {
            const formatVote = proposal.receipt.hasVoted
              ? proposal.receipt.support
                ? "For"
                : "Against"
              : "No Vote";

            return (
              <GovernanceProposal key={i} {...proposal} vote={formatVote} />
            );
          })}
      </div>
    </div>
  );
};

export default GovernanceVotingHistory;
