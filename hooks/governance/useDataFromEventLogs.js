import useSWR from "swr";
import useChainId from "hooks/useChainId";
import fetchGovernanceProposals from "fetchers/fetchGovernanceProposals";

const fetchData = (chainId) => () => {
  return fetchGovernanceProposals(chainId);
};

export function useDataFromEventLogs() {
  const chainId = useChainId();

  const shouldFetch = chainId;

  return useSWR(shouldFetch ? ["EventLogsData"] : null, fetchData(chainId), {
    shouldRetryOnError: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
