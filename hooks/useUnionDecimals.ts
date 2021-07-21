import { Contract } from "@ethersproject/contracts";
import useUnionContract from "./contracts/useUnionContract";
import useSWR from "swr";

const getDecimals = (unionContract: Contract) => async (_: any) => {
  return unionContract.decimals();
};

export default function useUnionDecimals() {
  const unionContract: Contract = useUnionContract();
  const shouldFetch = !!unionContract;
  return useSWR(
    shouldFetch ? ["unionDecimals"] : null,
    getDecimals(unionContract)
  );
}
