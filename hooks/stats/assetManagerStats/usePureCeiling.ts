import usePureTokenAdapterContract from "hooks/contracts/usePureTokenAdapterContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useChainId from "hooks/useChainId";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TOKENS } from "constants/variables";
import useSWR from "swr";

const getPureCeiling =
  (pureAdapter: Contract) =>
  async (_: any, decimals: BigNumber, daiAddress: String) => {
    const pureCeiling: BigNumber = await pureAdapter.ceilingMap(daiAddress);
    return formatUnits(pureCeiling, decimals);
  };

export default function usePureCeiling() {
  const pureAdapter: Contract = usePureTokenAdapterContract();
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();

  const shouldFetch =
    !!pureAdapter && chainId && TOKENS[chainId] && TOKENS[chainId].DAI;
  return useSWR(
    shouldFetch ? ["pureCeiling", decimals, TOKENS[chainId].DAI] : null,
    getPureCeiling(pureAdapter)
  );
}
