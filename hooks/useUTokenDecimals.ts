import { Contract } from "@ethersproject/contracts";
import useUTokenContract from "./contracts/useUTokenContract";
import useSWR from "swr";
import useReadProvider from "./useReadProvider";

const getDecimals = (uTokenContract: Contract) => async (_: any) => {
  return uTokenContract.decimals();
};

export default function useUTokenDecimals() {
  const readProvider = useReadProvider();
  const uTokenContract: Contract = useUTokenContract(readProvider);
  const shouldFetch = !!uTokenContract;
  return useSWR(
    shouldFetch ? ["uTokenDecimals"] : null,
    getDecimals(uTokenContract)
  );
}
