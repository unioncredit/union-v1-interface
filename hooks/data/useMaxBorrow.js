import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useCurrentToken from "hooks/useCurrentToken";
import useSWR from "swr";

const getMaxBorrow = (contract) => async (_, tokenAddress, library) => {
  const marketAddress = await contract.tokens(tokenAddress);

  const lendingMarketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    library.getSigner()
  );

  const res = await lendingMarketContract.maxBorrow();

  return Number(formatUnits(res, 18));
};

export default function useMaxBorrow() {
  const marketRegistryContract = useMarketRegistryContract();
  const DAI = useCurrentToken();
  const { library } = useWeb3React();

  const shouldFetch = !!marketRegistryContract && typeof DAI === "string";

  return useSWR(
    shouldFetch ? ["MaxBorrow", DAI, library] : null,
    getMaxBorrow(marketRegistryContract)
  );
}
