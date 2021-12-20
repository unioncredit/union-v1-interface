import type { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import type { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import { BLOCKS_PER_YEAR } from "constants/variables";
import useAssetContract from "hooks/contracts/useAssetContract";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useUnionContract from "hooks/contracts/useUnionContract";
import useCurrentToken from "hooks/useCurrentToken";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useSWR from "swr";

const getStatisticsData =
  (
    marketRegistryContract: Contract,
    unionContract: Contract,
    assetContract: Contract
  ) =>
  async (_: any, DAI: string, chainId: number, library: Web3Provider) => {
    const { uToken, userManager } = await marketRegistryContract.tokens(DAI);

    const uTokenContract = new Contract(
      uToken,
      U_TOKEN_ABI,
      library.getSigner()
    );

    const userManagerContract = new Contract(
      userManager,
      USER_MANAGER_ABI,
      library.getSigner()
    );

    const currentTotalStaked: BigNumber =
      await userManagerContract.totalStaked();

    const loanableAmount: BigNumber = await assetContract.getLoanableAmount(
      DAI
    );

    const totalBorrowed: BigNumber = await uTokenContract.totalBorrows();

    const ratePreBlock: BigNumber = await uTokenContract.borrowRatePerBlock();

    return {
      lendingPoolBalance: parseFloat(formatUnits(loanableAmount, 18)),
      totalStaked: parseFloat(formatUnits(currentTotalStaked, 18)),
      outstandingLoans: parseFloat(formatUnits(totalBorrowed, 18)),
      interestRate:
        parseFloat(formatUnits(ratePreBlock, 18)) * BLOCKS_PER_YEAR[chainId],
    };
  };

export default function useStatisticsData() {
  const { library, chainId } = useWeb3React();

  const DAI = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract();
  const unionContract = useUnionContract();
  const assetContract = useAssetContract();

  const shouldFetch =
    !!marketRegistryContract &&
    !!unionContract &&
    !!assetContract &&
    typeof chainId === "number" &&
    typeof DAI === "string" &&
    !!library;

  return useSWR(
    shouldFetch ? ["StatisticsData", DAI, chainId, library] : null,
    getStatisticsData(marketRegistryContract, unionContract, assetContract)
  );
}
