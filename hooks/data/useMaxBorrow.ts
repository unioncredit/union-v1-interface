import useSWR from "swr";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useReadProvider from "hooks/useReadProvider";
import useUTokenContract from "hooks/contracts/useUTokenContract";

const getMaxBorrow = (contract: Contract) => async () => {
  const res = await contract.maxBorrow();

  return Number(formatUnits(res, 18));
};

export default function useMaxBorrow() {
  const readProvider = useReadProvider();
  const uTokenContract = useUTokenContract(readProvider);

  const shouldFetch = !!uTokenContract;

  return useSWR(shouldFetch ? "MaxBorrow" : null, getMaxBorrow(uTokenContract));
}
