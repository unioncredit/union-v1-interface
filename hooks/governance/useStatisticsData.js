import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import { BLOCKS_PER_YEAR } from "constants/variables";
import useCurrentToken from "hooks/useCurrentToken";
import useMarketRegistryContract from "hooks/useMarketRegistryContract";
import useUserContract from "hooks/useUserContract";
import useSWR from "swr";
import { useGovernanceTokenContract } from "./useGovernanceContract";

const getStatisticsData = (
  marketRegistryContract,
  userContract,
  tokenContract
) => async (_, account, DAI, chainId, library) => {
  const marketAddress = await marketRegistryContract.tokens(DAI);

  const marketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    library.getSigner()
  );

  // const currentBlockNumber = await library.getBlockNumber();

  // const currentBlock = await library.getBlock(currentBlock);

  // const previousTotalStaked = await userContract.totalStaked(DAI, {
  //   blockNumber: currentBlockNumber,
  // });

  const currentTotalStaked = await userContract.totalStaked(DAI);

  const totalBorrowed = await marketContract.totalBorrows();

  const totalSupply = await tokenContract.totalSupply();

  const ratePreBlock = await marketContract.borrowRatePerBlock();

  return {
    totalStaked: parseFloat(formatUnits(currentTotalStaked, 18)),
    outstandingLoans: parseFloat(formatUnits(totalBorrowed, 18)),
    totalSupply: parseFloat(formatUnits(totalSupply, 18)),
    interestRate: parseFloat(
      formatUnits(ratePreBlock, 18) * BLOCKS_PER_YEAR[chainId]
    ),
  };
};

export default function useStatisticsData() {
  const { account, library, chainId } = useWeb3React();

  const DAI = useCurrentToken();

  const userContract = useUserContract();
  const marketRegistryContract = useMarketRegistryContract();
  const tokenContract = useGovernanceTokenContract();

  const shouldFetch =
    !!marketRegistryContract &&
    !!userContract &&
    !!tokenContract &&
    typeof account === "string" &&
    typeof chainId === "number" &&
    typeof DAI === "string" &&
    !!library;

  return useSWR(
    shouldFetch ? ["StatisticsData", account, DAI, chainId, library] : null,
    getStatisticsData(marketRegistryContract, userContract, tokenContract)
  );
}
