import useComptrollerContract from "hooks/contracts/useComptrollerContract";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getUnionInflationIndex = (comptrollerContract: Contract) => async (
  _: any
) => {
  const decimals = BigNumber.from(18);
  const inflationIndex: BigNumber = await comptrollerContract.gInflationIndex();
  return formatUnits(inflationIndex, decimals);
};

export default function useUnionInflationIndex() {
  const comptrollerContract: Contract = useComptrollerContract();
  const shouldFetch = !!comptrollerContract;
  return useSWR(
    shouldFetch ? ["unionInflationIndex"] : null,
    getUnionInflationIndex(comptrollerContract)
  );
}
