import useSWR from "swr";
import useChainId from "hooks/useChainId";
import fetchUserTransactions from "fetchers/fetchUserTransactions";
import fetchUTokenTransactions from "fetchers/fetchUTokenTransactions";

async function fetchData(_, chainId, address) {
  const utokenTransactions = await fetchUTokenTransactions(chainId, address);
  const userTransactions = await fetchUserTransactions(chainId, address);

  return [...utokenTransactions, ...userTransactions].sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  });
}

export default function useAddressHistory(address) {
  const chainId = useChainId();

  const shouldFetch = chainId;

  return useSWR(
    shouldFetch ? ["EventLogsData", chainId, address] : null,
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
