import useAllProposalData from "./useAllProposalData";

/**
 * @name useFilteredProposalData
 *
 * @param {("all"|"active"|"passed"|"failed"|"executed")} status
 * @param {("all"|"onchain"|"offchain")} type
 */
export default function useFilteredProposalData(status, type) {
  const { data } = useAllProposalData();

  return data
    ?.filter((proposal) => {
      if (status === "all") return true;

      if (status === "active")
        return Boolean(
          proposal.status === "queued" ||
            proposal.status === "pending" ||
            proposal.status === "active"
        );

      if (status === "passed") return Boolean(proposal.status === "succeeded");

      if (status === "failed")
        return Boolean(
          proposal.status === "defeated" ||
            proposal.status === "canceled" ||
            proposal.status === "expired"
        );

      return Boolean(proposal.status === status);
    })
    .filter((proposal) => {
      if (type === "all") return true;

      return Boolean(proposal.type === type);
    });
}
