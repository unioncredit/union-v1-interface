import { Contract } from "@ethersproject/contracts";
import useTimelockContract from "hooks/contracts/useTimelockContract";
import useSWR from "swr";

const getTimelock = (timelockContract: Contract) => async () => {
  return timelockContract.delay();
};

export default function useTimelock() {
  const contract: Contract = useTimelockContract();
  const shouldFetch: boolean = Boolean(contract);

  return useSWR(shouldFetch ? ["timelock"] : null, getTimelock(contract));
}
