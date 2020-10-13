import classNames from "classnames";
import GovernanceProposalVote, {
  GovernanceProposalVoteSkeleton,
} from "components/governance/GovernanceProposalVote";
import { Fragment, useState } from "react";

const VoteFilterButton = ({ onClick, label, isActive }) => {
  const cachedClassNames = classNames(
    "px-4 py-4 font-semibold focus:outline-none transition-colors duration-150",
    isActive
      ? "text-type-base border-b-2 border-pink-3-pure"
      : "text-type-light border-b-2 border-transparent"
  );

  return (
    <button onClick={onClick} className={cachedClassNames}>
      {label}
    </button>
  );
};

const GovernanceProposalVoteHistory = () => {
  const data = [];

  const hasVotes = data && data.length > 0;

  const [voteFilter, voteFilterSet] = useState("all");

  const updateVoteFilter = (type) => () => voteFilterSet(type);

  return (
    <div className="bg-white rounded border">
      <div className="px-4 sm:px-6 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <VoteFilterButton
              onClick={updateVoteFilter("all")}
              isActive={voteFilter === "all"}
              label="All"
            />
            <VoteFilterButton
              onClick={updateVoteFilter("for")}
              isActive={voteFilter === "for"}
              label="For"
            />
            <VoteFilterButton
              onClick={updateVoteFilter("against")}
              isActive={voteFilter === "against"}
              label="Against"
            />
          </div>
        </div>

        <div className="divider -mt-px" />
      </div>

      <div className="p-2">
        {hasVotes ? (
          data.map((vote, i) => <GovernanceProposalVote key={i} {...vote} />)
        ) : (
          <Fragment>
            <GovernanceProposalVoteSkeleton />
            <GovernanceProposalVoteSkeleton />
            <GovernanceProposalVoteSkeleton />
            <GovernanceProposalVoteSkeleton />
          </Fragment>
        )}
      </div>

      {/* Spacer */}
      <div className="h-4" />
    </div>
  );
};

export default GovernanceProposalVoteHistory;
