import useCompoundAdapterContract from "hooks/contracts/useCompoundAdapterContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useChainId from "hooks/useChainId";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TOKENS } from "constants/variables";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getCompoundCeiling =
  (compoundAdapter: Contract) =>
  async (_: any, decimals: BigNumber, daiAddress: String) => {
    const compoundCeiling: BigNumber = await compoundAdapter.ceilingMap(
      daiAddress
    );
    return formatUnits(compoundCeiling, decimals);
  };

export default function useCompoundCeiling() {
  const readProvider = useReadProvider();
  const compoundAdapter: Contract = useCompoundAdapterContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();

  const shouldFetch =
    !!compoundAdapter &&
    !!chainId &&
    !!TOKENS[chainId] &&
    !!TOKENS[chainId].DAI;

  return useSWR(
    shouldFetch ? ["compoundCeiling", decimals, TOKENS[chainId].DAI] : null,
    getCompoundCeiling(compoundAdapter)
  );
}
