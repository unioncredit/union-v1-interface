import useAaveAdapterContract from "hooks/contracts/useAaveAdapterContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useChainId from "hooks/useChainId";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TOKENS } from "constants/variables";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getDAIInAave =
  (AaveAdapter: Contract) =>
  async (_: any, decimals: BigNumber, daiAddress: String) => {
    const daiInAave: BigNumber = await AaveAdapter.getSupplyView(daiAddress);
    return formatUnits(daiInAave, decimals);
  };

export default function useDAIInAave() {
  const readProvider = useReadProvider();
  const AaveAdapter: Contract = useAaveAdapterContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();
  const shouldFetch =
    !!AaveAdapter && chainId && TOKENS[chainId] && TOKENS[chainId].DAI;
  return useSWR(
    shouldFetch ? ["daiInAave", decimals, TOKENS[chainId].DAI] : null,
    getDAIInAave(AaveAdapter)
  );
}
