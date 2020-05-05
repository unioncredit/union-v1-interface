import fetcher from "@lib/fetcher";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useCurrentToken from "./useCurrentToken";

export function useTrustData() {
  const { library, account, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  return useSWR(
    ["trust", account, curToken, library, chainId],
    (key, account, curToken, library, chainId) =>
      fetcher(key, { account, curToken, library, chainId })
  );
}

export function useVouchData() {
  const { library, account, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  return useSWR(
    ["vouch", account, curToken, library, chainId],
    (key, account, curToken, library, chainId) =>
      fetcher(key, { account, curToken, library, chainId })
  );
}
