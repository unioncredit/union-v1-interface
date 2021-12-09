import { Contract } from "@ethersproject/contracts";
import useDAIContract from "./contracts/useDAIContract";
import useSWR from "swr";
import useReadProvider from "./useReadProvider";

const getDecimals = (daiContract: Contract) => async (_: any) => {
  return daiContract.decimals();
};

export default function useDAIDecimals() {
  const readProvider = useReadProvider();
  const daiContract: Contract = useDAIContract(readProvider);
  const shouldFetch = !!daiContract;
  return useSWR(shouldFetch ? ["daiDecimals"] : null, getDecimals(daiContract));
}
