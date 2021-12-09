import useUTokenContract from "hooks/contracts/useUTokenContract";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getUTokenRate = (uTokenContract: Contract) => async (_: any) => {
  const uTokenRate: BigNumber = await uTokenContract.exchangeRateStored();
  const decimals = BigNumber.from(18);
  return formatUnits(uTokenRate, decimals);
};

export default function useUTokenRate() {
  const readProvider = useReadProvider();
  const uTokenContract: Contract = useUTokenContract(readProvider);
  const shouldFetch = !!uTokenContract;
  return useSWR(
    shouldFetch ? ["uTokenRate"] : null,
    getUTokenRate(uTokenContract)
  );
}
