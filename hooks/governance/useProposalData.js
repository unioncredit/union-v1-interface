import useAllProposalData from "./useAllProposalData";

/**
 * @name useProposalData
 *
 * @param {string} id The ID of the proposal to pull the data for
 */
export default function useProposalData(id) {
  const { data } = useAllProposalData();

  return data?.find((p) => p.id === id);
}
