import useUTokenContract from "hooks/contracts/useUTokenContract";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getReserveFactor = (uTokenContract: Contract) => async (_: any) => {
  const reserveFactor: BigNumber = await uTokenContract.reserveFactorMantissa();
  const decimals = BigNumber.from(18);
  return formatUnits(reserveFactor, decimals);
};

export default function useReserveFactor() {
  const uTokenContract: Contract = useUTokenContract();
  const shouldFetch = !!uTokenContract;

  return useSWR(
    shouldFetch ? ["reserveFactor"] : null,
    getReserveFactor(uTokenContract)
  );
}
