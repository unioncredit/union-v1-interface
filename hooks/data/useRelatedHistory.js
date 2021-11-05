import useSWR from "swr";
import useChainId from "hooks/useChainId";
import fetchUserTransactions from "fetchers/fetchUserTransactions";
import fetchUTokenTransactions from "fetchers/fetchUTokenTransactions";

async function fetchData(_, chainId, account, staker, borrower) {
  const utokenTransactions = await fetchUTokenTransactions(chainId, account);
  const userTransactions = await fetchUserTransactions(
    chainId,
    staker,
    borrower
  );

  return [...utokenTransactions, ...userTransactions].sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  });
}

export default function useRelatedHistory(account, staker, borrower) {
  const chainId = useChainId();

  const shouldFetch = chainId;

  return useSWR(
    shouldFetch ? ["EventLogsData", chainId, account, staker, borrower] : null,
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
