import useUTokenContract from "hooks/contracts/useUTokenContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getTotalReserves =
  (uTokenContract: Contract) => async (_: any, decimals: BigNumber) => {
    const totalSupply: BigNumber = await uTokenContract.totalReserves();
    return formatUnits(totalSupply, decimals);
  };

export default function useTotalReserves() {
  const readProvider = useReadProvider();
  const uTokenContract: Contract = useUTokenContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const shouldFetch = !!uTokenContract;
  return useSWR(
    shouldFetch ? ["totalReserves", decimals] : null,
    getTotalReserves(uTokenContract)
  );
}
