import useAaveAdapterContract from "hooks/contracts/useAaveAdapterContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useChainId from "hooks/useChainId";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TOKENS } from "constants/variables";
import useSWR from "swr";

const getAaveFloor = (aaveAdapter: Contract) => async (
  _: any,
  decimals: BigNumber,
  daiAddress: String
) => {
  const aaveFloor: BigNumber = await aaveAdapter.floorMap(daiAddress);
  return formatUnits(aaveFloor, decimals);
};

export default function useAaveFloor() {
  const aaveAdapter: Contract = useAaveAdapterContract();
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();

  const shouldFetch =
    !!aaveAdapter && chainId && TOKENS[chainId] && TOKENS[chainId].DAI;
  return useSWR(
    shouldFetch ? ["aaveFloor", decimals, TOKENS[chainId].DAI] : null,
    getAaveFloor(aaveAdapter)
  );
}
