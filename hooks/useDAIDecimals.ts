import { Contract } from "@ethersproject/contracts";
import useDAIContract from "./contracts/useDAIContract";
import useSWR from "swr";

const getDecimals = (daiContract: Contract) => async (_: any) => {
  return daiContract.decimals();
};

export default function useDAIDecimals() {
  const daiContract: Contract = useDAIContract();
  const shouldFetch = !!daiContract;
  return useSWR(shouldFetch ? ["daiDecimals"] : null, getDecimals(daiContract));
}
