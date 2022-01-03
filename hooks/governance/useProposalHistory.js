import useSWR from "swr";
import fetchGovernanceProposalHistory from "fetchers/fetchGovernanceProposalHistory";
import useChainId from "hooks/useChainId";

const getProposalHistory = (_, chainId, pid) => {
  return fetchGovernanceProposalHistory(chainId, pid);
};

export default function useProposalHistory(id) {
  const chainId = useChainId();

  const shouldFetch = !!chainId && !!id;

  return useSWR(
    shouldFetch ? ["ProposalHistory", chainId, id] : null,
    getProposalHistory
  );
}
