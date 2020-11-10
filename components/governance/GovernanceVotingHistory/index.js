import GovernanceProposal, {
  GovernanceProposalSkeleton,
} from "components/governance/GovernanceProposal";
import TablePagination from "components/tables/TablePagination";
import useUserProposalVoteHistory from "hooks/governance/useUserProposalVoteHistory";
import usePagination from "hooks/usePagination";

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
    <div className="md:bg-white md:rounded md:border">
      <div className="md:p-2">
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
          <div className="space-y-8 md:space-y-0">
            <GovernanceProposalSkeleton />
            <GovernanceProposalSkeleton />
            <GovernanceProposalSkeleton />
            <GovernanceProposalSkeleton />
            <GovernanceProposalSkeleton />
          </div>
        )}
      </div>

      {proposals?.length > 5 && (
        <div className="md:px-6 md:pb-4">
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
