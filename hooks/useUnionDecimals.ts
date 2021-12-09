import { Contract } from "@ethersproject/contracts";
import useUnionContract from "./contracts/useUnionContract";
import useSWR from "swr";
import useReadProvider from "./useReadProvider";

const getDecimals = (unionContract: Contract) => async (_: any) => {
  return unionContract.decimals();
};

export default function useUnionDecimals() {
  const readProvider = useReadProvider();
  const unionContract: Contract = useUnionContract(readProvider);
  const shouldFetch = !!unionContract;
  return useSWR(
    shouldFetch ? ["unionDecimals"] : null,
    getDecimals(unionContract)
  );
}
