import GovernanceProposal, {
  GovernanceProposalSkeleton,
} from "components/governance/GovernanceProposal";
import TablePagination from "components/TablePagination";
import useUserProposalVoteHistory from "hooks/governance/useUserProposalVoteHistory";
import usePagination from "hooks/usePagination";
import { Fragment } from "react";

const GovernanceVotingHistory = ({ address }) => {
  const { data } = useUserProposalVoteHistory(address);
  const { next, prev, currentData, currentPage, jump, maxPage } = usePagination(
    data,
    5
  );

  /**
   * @type {Array}
   */
  const proposals = data ? currentData() : [];

  return (
    <div className="bg-white rounded border">
      <div className="px-2 pt-2">
        {proposals?.length > 0 ? (
          proposals?.map((proposal, i) => {
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

      {proposals?.length > 0 && (
        <div className="px-6 pb-4">
          <TablePagination
            pageOptions={new Array(maxPage).fill("")}
            pageCount={maxPage}
            canPreviousPage={currentPage > 1}
            canNextPage={currentPage < maxPage}
            gotoPage={(i) => jump(i + 1)}
            nextPage={next}
            previousPage={prev}
            state={{ pageIndex: currentPage - 1 }}
          />
        </div>
      )}
    </div>
  );
};

export default GovernanceVotingHistory;
