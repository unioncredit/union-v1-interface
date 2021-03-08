import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useComptrollerContract from "hooks/contracts/useComptrollerContract";

const getHalfDecayPoint = (comptrollerContract: Contract) => async (_: any) => {
  return comptrollerContract.halfDecayPoint();
};

export default function useHalfDecayPoint() {
  const comptrollerContract: Contract = useComptrollerContract();
  const shouldFetch = !!comptrollerContract;

  return useSWR(
    shouldFetch ? ["halfDecayPoint"] : null,
    getHalfDecayPoint(comptrollerContract)
  );
}
