import useAssetContract from "hooks/contracts/useAssetContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useChainId from "hooks/useChainId";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TOKENS } from "constants/variables";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getPoolBalance =
  (assetContract: Contract) =>
  async (_: any, decimals: BigNumber, daiAddress: String) => {
    const poolBalance: BigNumber = await assetContract.getPoolBalance(
      daiAddress
    );
    return formatUnits(poolBalance, decimals);
  };

export default function usePoolBalance() {
  const readProvider = useReadProvider();
  const assetContract: Contract = useAssetContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();

  const shouldFetch =
    !!assetContract && chainId && TOKENS[chainId] && TOKENS[chainId].DAI;
  return useSWR(
    shouldFetch ? ["poolBalance", decimals, TOKENS[chainId].DAI] : null,
    getPoolBalance(assetContract)
  );
}
