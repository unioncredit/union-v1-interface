import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useSWR from "swr";
import useCurrentToken from "./useCurrentToken";
import useMarketRegistryContract from "./useMarketRegistryContract";

const getCreditLimit = (marketRegistryContract) => async (
  _,
  account,
  tokenAddress,
  library
) => {
  const marketAddress = await marketRegistryContract.tokens(tokenAddress);

  const lendingMarketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    library.getSigner()
  );

  const res = await lendingMarketContract.getCreditLimit(account);

  return parseInt(formatUnits(res, 18));
};

export default function useCreditLimit() {
  const { account, library } = useWeb3React();
  const curToken = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["CreditLimit", account, curToken, library] : null,
    getCreditLimit(marketRegistryContract)
  );
}
