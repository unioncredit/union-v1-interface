import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import { BLOCKS_PER_YEAR } from "constants/variables";
import useAssetContract from "hooks/contracts/useAssetContract";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useUnionContract from "hooks/contracts/useUnionContract";
import useUserContract from "hooks/contracts/useUserContract";
import useCurrentToken from "hooks/useCurrentToken";
import useSWR from "swr";

const getStatisticsData = (
  marketRegistryContract,
  userContract,
  unionContract,
  assetContract
) => async (_, DAI, chainId, library) => {
  const marketAddress = await marketRegistryContract.tokens(DAI);

  const marketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    library.getSigner()
  );

  const currentTotalStaked = await userContract.totalStaked(DAI);

  const totalFrozen = await userContract.totalFrozen(DAI);

  const loanableAmount = await assetContract.getLoanableAmount(DAI);

  const totalBorrowed = await marketContract.totalBorrows();

  const totalSupply = await unionContract.totalSupply();

  const ratePreBlock = await marketContract.borrowRatePerBlock();

  return {
    lendingPoolBalance: parseFloat(formatUnits(loanableAmount, 18)),
    totalDefaulted: parseFloat(formatUnits(totalFrozen, 18)),
    totalStaked: parseFloat(formatUnits(currentTotalStaked, 18)),
    outstandingLoans: parseFloat(formatUnits(totalBorrowed, 18)),
    totalSupply: parseFloat(formatUnits(totalSupply, 18)),
    interestRate: parseFloat(
      formatUnits(ratePreBlock, 18) * BLOCKS_PER_YEAR[chainId]
    ),
  };
};

export default function useStatisticsData() {
  const { library, chainId } = useWeb3React();

  const DAI = useCurrentToken();

  const userContract = useUserContract();
  const marketRegistryContract = useMarketRegistryContract();
  const unionContract = useUnionContract();
  const assetContract = useAssetContract();

  const shouldFetch =
    !!marketRegistryContract &&
    !!userContract &&
    !!unionContract &&
    !!assetContract &&
    typeof chainId === "number" &&
    typeof DAI === "string" &&
    !!library;

  return useSWR(
    shouldFetch ? ["StatisticsData", DAI, chainId, library] : null,
    getStatisticsData(
      marketRegistryContract,
      userContract,
      unionContract,
      assetContract
    )
  );
}
