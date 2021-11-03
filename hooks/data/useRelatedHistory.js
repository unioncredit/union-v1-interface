import useSWR from "swr";
import useChainId from "hooks/useChainId";
import fetchUserTransactions from "fetchers/fetchUserTransactions";
import fetchUTokenTransactions from "fetchers/fetchUTokenTransactions";

async function fetchData(_, chainId, staker, borrower) {
  const utokenTransactions = await fetchUTokenTransactions(chainId, staker);
  const userTransactions = await fetchUserTransactions(
    chainId,
    staker,
    borrower
  );

  return [...utokenTransactions, ...userTransactions].sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  });
}

export default function useRelatedHistory(staker, borrower) {
  const chainId = useChainId();

  const shouldFetch = chainId;

  return useSWR(
    shouldFetch ? ["EventLogsData", chainId, staker, borrower] : null,
    fetchData,
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
