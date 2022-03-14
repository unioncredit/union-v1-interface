import useSWR from "swr";
import { Contract } from "@ethersproject/contracts";
import useReadProvider from "hooks/useReadProvider";
import useUTokenContract from "hooks/contracts/useUTokenContract";

const getMaxBorrow = (contract: Contract) => async () => {
  return await contract.maxBorrow();
};

export default function useMaxBorrow() {
  const readProvider = useReadProvider();
  const uTokenContract = useUTokenContract(readProvider);

  const shouldFetch = !!uTokenContract;

  return useSWR(shouldFetch ? "MaxBorrow" : null, getMaxBorrow(uTokenContract));
}
