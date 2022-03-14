import { Contract } from "@ethersproject/contracts";
import useTimelockContract from "hooks/contracts/useTimelockContract";
import useReadProvider from "hooks/useReadProvider";
import useSWR from "swr";

const getTimelock = async (_, timelockContract: Contract) => {
  return timelockContract.getMinDelay();
};

export default function useTimelock() {
  const readProvider = useReadProvider();
  const contract: Contract = useTimelockContract(readProvider);
  const shouldFetch: boolean = Boolean(contract);

  return useSWR(shouldFetch ? ["timelock", contract] : null, getTimelock);
}
