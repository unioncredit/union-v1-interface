import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import fetcher from "lib/fetcher";
import useSWR from "swr";
import useCurrentToken from "./useCurrentToken";

export default function useTrustData() {
  const { library, account, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const shouldFetch =
    typeof chainId === "number" &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library
      ? true
      : false;

  return useSWR(
    shouldFetch ? ["trust", account, curToken, library, chainId] : null,
    (key, account, curToken, library, chainId) =>
      fetcher(key, { account, curToken, library, chainId })
  );
}
