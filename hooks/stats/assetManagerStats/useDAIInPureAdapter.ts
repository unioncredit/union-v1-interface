import usePureTokenAdapterContract from "hooks/contracts/usePureTokenAdapterContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useChainId from "hooks/useChainId";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TOKENS } from "constants/variables";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getDAIInPureAdapter =
  (pureAdapter: Contract) =>
  async (_: any, decimals: BigNumber, daiAddress: String) => {
    const daiInPureAdapter: BigNumber = await pureAdapter.getSupplyView(
      daiAddress
    );
    return formatUnits(daiInPureAdapter, decimals);
  };

export default function useDAIInPureAdapter() {
  const readProvider = useReadProvider();
  const pureAdapter: Contract = usePureTokenAdapterContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();

  const shouldFetch =
    !!pureAdapter && chainId && TOKENS[chainId] && TOKENS[chainId].DAI;
  return useSWR(
    shouldFetch ? ["daiInPureAdapter", decimals, TOKENS[chainId].DAI] : null,
    getDAIInPureAdapter(pureAdapter)
  );
}
