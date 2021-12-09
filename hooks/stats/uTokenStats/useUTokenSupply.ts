import useUTokenContract from "hooks/contracts/useUTokenContract";
import useUTokenDecimals from "hooks/useUTokenDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getUTokenSupply =
  (uTokenContract: Contract) => async (_: any, decimals: BigNumber) => {
    const totalSupply: BigNumber = await uTokenContract.totalSupply();
    return formatUnits(totalSupply, decimals);
  };

export default function useUTokenSupply() {
  const readProvider = useReadProvider();
  const uTokenContract: Contract = useUTokenContract(readProvider);
  const { data: decimals } = useUTokenDecimals();
  const shouldFetch = !!uTokenContract;
  return useSWR(
    shouldFetch ? ["uTokenSupply", decimals] : null,
    getUTokenSupply(uTokenContract)
  );
}
