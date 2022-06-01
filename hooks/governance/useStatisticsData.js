import { formatUnits } from "@ethersproject/units";
import { BLOCKS_PER_YEAR } from "constants/variables";
import useAssetContract from "hooks/contracts/useAssetContract";
import useCurrentToken from "hooks/useCurrentToken";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";
import useChainId from "hooks/useChainId";
import useUserContract from "hooks/contracts/useUserContract";
import useUTokenContract from "hooks/contracts/useUTokenContract";

const getStatisticsData = async (
  _,
  DAI,
  chainId,
  assetContract,
  userManagerContract,
  uTokenContract
) => {
  const currentTotalStaked = await userManagerContract.totalStaked();

  const loanableAmount = await assetContract.getLoanableAmount(DAI);

  const totalBorrowed = await uTokenContract.totalBorrows();

  const ratePreBlock = await uTokenContract.borrowRatePerBlock();

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
  const readProvider = useReadProvider();

  const DAI = useCurrentToken();

  const assetContract = useAssetContract(readProvider);
  const userManagerContract = useUserContract(readProvider);
  const uTokenContract = useUTokenContract(readProvider);

  const shouldFetch =
    !!assetContract &&
    typeof chainId === "number" &&
    typeof DAI === "string" &&
    !!readProvider;

  return useSWR(
    shouldFetch
      ? [
          "StatisticsData",
          DAI,
          chainId,
          assetContract,
          userManagerContract,
          uTokenContract,
        ]
      : null,
    getStatisticsData
  );
}
