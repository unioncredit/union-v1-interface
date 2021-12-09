import useCompoundAdapterContract from "hooks/contracts/useCompoundAdapterContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useChainId from "hooks/useChainId";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TOKENS } from "constants/variables";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getDAIInCompound =
  (compoundAdapter: Contract) =>
  async (_: any, decimals: BigNumber, daiAddress: String) => {
    const daiInCompound: BigNumber = await compoundAdapter.getSupplyView(
      daiAddress
    );
    return formatUnits(daiInCompound, decimals);
  };

export default function useDAIInCompound() {
  const readProvider = useReadProvider();
  const compoundAdapter: Contract = useCompoundAdapterContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();

  const shouldFetch =
    !!compoundAdapter && chainId && TOKENS[chainId] && TOKENS[chainId].DAI;

  return useSWR(
    shouldFetch ? ["daiInCompound", decimals, TOKENS[chainId].DAI] : null,
    getDAIInCompound(compoundAdapter)
  );
}
