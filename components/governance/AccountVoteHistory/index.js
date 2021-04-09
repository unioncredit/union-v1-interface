import Proposal, { ProposalSkeleton } from "components/governance/Proposal";
import TablePagination from "components/tables/TablePagination";
import useUserProposalVoteHistory from "hooks/governance/useUserProposalVoteHistory";
import usePagination from "hooks/usePagination";

const ProposalVoteHistoryList = ({ address }) => {
  const { data } = useUserProposalVoteHistory(address);
  const { next, prev, currentData, currentPage, jump, maxPage } = usePagination(
    data,
    5
  );

  /**
   * @type {Array}
   */
  const proposals = data ? currentData() : undefined;

  return (
    <div className="md:bg-white md:rounded md:border">
      <div className="md:p-2">
        {proposals ? (
          proposals.length > 0 ? (
            proposals.map((proposal, i) => {
              const formatVote = proposal.receipt.hasVoted
                ? proposal.receipt.support
                  ? "For"
                  : "Against"
                : "No Vote";

              return <Proposal key={i} {...proposal} vote={formatVote} />;
            })
          ) : (
            <div className="text-center p-32 text-type-base">
              No previous proposals
            </div>
          )
        ) : (
          <div className="space-y-8 md:space-y-0">
            <ProposalSkeleton />
            <ProposalSkeleton />
            <ProposalSkeleton />
            <ProposalSkeleton />
            <ProposalSkeleton />
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

export default ProposalVoteHistoryList;
