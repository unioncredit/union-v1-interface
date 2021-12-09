import usePureTokenAdapterContract from "hooks/contracts/usePureTokenAdapterContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useChainId from "hooks/useChainId";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TOKENS } from "constants/variables";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getPureFloor =
  (pureAdapter: Contract) =>
  async (_: any, decimals: BigNumber, daiAddress: String) => {
    const pureFloor: BigNumber = await pureAdapter.floorMap(daiAddress);
    return formatUnits(pureFloor, decimals);
  };

export default function usePureFloor() {
  const readProvider = useReadProvider();
  const pureAdapter: Contract = usePureTokenAdapterContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();

  const shouldFetch =
    !!pureAdapter && chainId && TOKENS[chainId] && TOKENS[chainId].DAI;
  return useSWR(
    shouldFetch ? ["pureFloor", decimals, TOKENS[chainId].DAI] : null,
    getPureFloor(pureAdapter)
  );
}
