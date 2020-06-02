import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import fetcher from "lib/fetcher";
import useSWR from "swr";
import useCurrentToken from "./useCurrentToken";

export default function useTransactions() {
  const { library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const shouldFetch =
    typeof chainId === "number" && isAddress(curToken) && !!library
      ? true
      : false;

  return useSWR(
    shouldFetch ? ["transactions", curToken, library, chainId] : null,
    (key, curToken, library, chainId) =>
      fetcher(key, { curToken, library, chainId })
  );
}
