import { Contract } from "@ethersproject/contracts";
import useUTokenContract from "./contracts/useUTokenContract";
import useSWR from "swr";

const getDecimals = (uTokenContract: Contract) => async (_: any) => {
  return uTokenContract.decimals();
};

export default function useUTokenDecimals() {
  const uTokenContract: Contract = useUTokenContract();
  const shouldFetch = !!uTokenContract;
  return useSWR(
    shouldFetch ? ["uTokenDecimals"] : null,
    getDecimals(uTokenContract)
  );
}
