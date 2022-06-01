import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useUTokenContract from "hooks/contracts/useUTokenContract";
import useReadProvider from "hooks/useReadProvider";

const daiDecimals = 18;

const getMinBorrow =
  (uTokenContract: Contract) => async (_, decimals: BigNumber) => {
    const minBorrow: BigNumber = await uTokenContract.minBorrow();
    return Number(formatUnits(minBorrow, decimals));
  };

export default function useMinBorrow() {
  const readProvider = useReadProvider();
  const uTokenContract = useUTokenContract(readProvider);

  const shouldFetch = !!uTokenContract;

  return useSWR(
    shouldFetch ? ["minBorrow", daiDecimals] : null,
    getMinBorrow(uTokenContract)
  );
}
