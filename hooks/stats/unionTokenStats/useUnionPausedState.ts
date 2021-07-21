import { Contract } from "@ethersproject/contracts";
import useUnionContract from "hooks/contracts/useUnionContract";
import useSWR from "swr";

const getUnionPausedState = (unionContract: Contract) => async (_: any) => {
  return unionContract.whitelistEnabled();
};

export default function useUnionPausedState() {
  const unionContract: Contract = useUnionContract();
  const shouldFetch = !!unionContract;

  return useSWR(
    shouldFetch ? ["unionPausedState"] : null,
    getUnionPausedState(unionContract)
  );
}
