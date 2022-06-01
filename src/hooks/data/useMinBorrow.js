import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import useUTokenContract from "hooks/contracts/useUTokenContract";
import useReadProvider from "hooks/useReadProvider";

const daiDecimals = 18;

const getMinBorrow = (uTokenContract) => async (_, decimals) => {
  const minBorrow = await uTokenContract.minBorrow();
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
