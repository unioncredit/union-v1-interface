import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";

import { BLOCKS_PER_YEAR } from "constants/variables";
import useChainId from "hooks/useChainId";
import useUserManager from "hooks/contracts/useUserManager";
import useAssetManager from "hooks/contracts/useAssetManager";
import useToken from "hooks/useToken";
import useUToken from "hooks/contracts/useUToken";

// TODO: update this to use graph/multicall
const fetchStatisticsData = async (
  _,
  DAI,
  chainId,
  assetManager,
  userManager,
  uToken
) => {
  const currentTotalStaked = await userManager.totalStaked();

  const loanableAmount = await assetManager.getLoanableAmount(DAI);

  const totalBorrowed = await uToken.totalBorrows();

  const ratePreBlock = await uToken.borrowRatePerBlock();

  return {
    lendingPoolBalance: parseFloat(formatUnits(loanableAmount, 18)),
    totalStaked: parseFloat(formatUnits(currentTotalStaked, 18)),
    outstandingLoans: parseFloat(formatUnits(totalBorrowed, 18)),
    interestRate:
      parseFloat(formatUnits(ratePreBlock, 18)) * BLOCKS_PER_YEAR[chainId],
  };
};

export default function useStatisticsData() {
  const chainId = useChainId();
  const DAI = useToken();

  const assetManager = useAssetManager();
  const userManager = useUserManager(DAI);
  const uToken = useUToken(DAI);

  const shouldFetch = assetManager && userManager && uToken;

  return useSWR(
    shouldFetch
      ? ["useStatisticsData", DAI, chainId, assetManager, userManager, uToken]
      : null,
    fetchStatisticsData
  );
}
