import useUnionContract from "./contracts/useUnionContract";
import useChainId from "./useChainId";
import useSWR from "swr";

const getSymbol = (unionContract) => async () => {
  return unionContract.symbol();
};

export default function useUnionSymbol() {
  const unionContract = useUnionContract();
  const chainId = useChainId();
  const shouldFetch = !!unionContract;
  return useSWR(
    shouldFetch ? ["unionSymbol", chainId] : null,
    getSymbol(unionContract)
  );
}
