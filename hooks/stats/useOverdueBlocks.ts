import useUTokenContract from "hooks/contracts/useUTokenContract";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getOverdueBlocks = (uTokenContract: Contract) => async (_: any) => {
  return uTokenContract.overdueBlocks();
};

export default function useOverdueBlocks() {
  const uTokenContract: Contract = useUTokenContract();
  const shouldFetch = !!uTokenContract;

  return useSWR(
    shouldFetch ? ["overdueBlocks"] : null,
    getOverdueBlocks(uTokenContract)
  );
}
