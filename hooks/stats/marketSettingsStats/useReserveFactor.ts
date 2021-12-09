import useUTokenContract from "hooks/contracts/useUTokenContract";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getReserveFactor = (uTokenContract: Contract) => async (_: any) => {
  const reserveFactor: BigNumber = await uTokenContract.reserveFactorMantissa();
  const decimals = BigNumber.from(18);
  return formatUnits(reserveFactor, decimals);
};

export default function useReserveFactor() {
  const readProvider = useReadProvider();
  const uTokenContract: Contract = useUTokenContract(readProvider);
  const shouldFetch = !!uTokenContract;

  return useSWR(
    shouldFetch ? ["reserveFactor"] : null,
    getReserveFactor(uTokenContract)
  );
}
