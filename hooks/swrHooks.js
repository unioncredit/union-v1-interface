import { isAddress } from "@ethersproject/address";
import fetcher from "@lib/fetcher";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useCurrentToken from "./useCurrentToken";
import useMemberContract from "./useMemberContract";
// import useMarketRegistryContract from "./useMarketRegistryContract";
// import { formatUnits } from "@ethersproject/units";

export function useTrustData() {
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

export function useVouchData() {
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
    shouldFetch ? ["vouch", account, curToken, library, chainId] : null,
    (key, account, curToken, library, chainId) =>
      fetcher(key, { account, curToken, library, chainId })
  );
}

export function useTransactions() {
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

const getTrustCount = (contract) => async (account, tokenAddress) =>
  contract
    .trustList(account, tokenAddress)
    .then((res) => parseInt(res.toString()));

export function useTrustCountData() {
  const { account } = useWeb3React();
  const memberContract = useMemberContract();
  const curToken = useCurrentToken();

  const shouldFetch =
    !!memberContract && typeof account === "string" && isAddress(curToken);

  return useSWR(
    shouldFetch ? [account, curToken] : null,
    getTrustCount(memberContract),
    {
      dedupingInterval: 15 * 1000,
      refreshInterval: 30 * 1000,
    }
  );
}

// const getCreditLimit = (
//   lendingMarketContract,
//   marketRegistryContract
// ) => async (account, tokenAddress) => {
//   const marketAddress = await marketRegistryContract.tokens(tokenAddress);

//   const res = await lendingMarketContract.getCreditLimit(account);

//   return Number(formatUnits(res, 18));
// };

// function useCreditLimitData() {
//   const { account } = useWeb3React();

//   const curToken = useCurrentToken();

//   const marketRegistryContract = useMarketRegistryContract();
// }
