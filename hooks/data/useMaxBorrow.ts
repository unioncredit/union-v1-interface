import { Contract } from "@ethersproject/contracts";
import type { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useCurrentToken from "hooks/useCurrentToken";
import useSWR from "swr";

const getMaxBorrow = (contract: Contract) => async (
  _: any,
  tokenAddress: string,
  library: Web3Provider
) => {
  const market = await contract.tokens(tokenAddress);
  const uTokenAddress = market.uToken;

  const uTokenContract = new Contract(
    uTokenAddress,
    U_TOKEN_ABI,
    library.getSigner()
  );

  const res = await uTokenContract.maxBorrow();

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
