import useAllProposalData from "./useAllProposalData";

/**
 * @name useFilteredProposalData
 *
 * @param {("all"|"pending"|"active"|"canceled"|"defeated"|"succeeded"|"queued"|"expired"|"executed")} status
 * @param {("all"|"onchain"|"offchain")} type
 */
export default function useFilteredProposalData(status, type) {
  const { data } = useAllProposalData();

  return data
    ?.filter((proposal) => {
      if (status === "all") return true;

      return Boolean(proposal.status === status);
    })
    .filter((proposal) => {
      if (type === "all") return true;

      return Boolean(proposal.type === type);
    });
}
