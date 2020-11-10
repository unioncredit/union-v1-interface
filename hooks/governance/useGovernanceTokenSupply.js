import { formatUnits } from "@ethersproject/units";
import useUnionContract from "hooks/contracts/useUnionContract";
import useSWR from "swr";

const getGovernanceTokenSupply = (contract) => async () => {
  const totalSupply = await contract.totalSupply();

  return parseFloat(formatUnits(totalSupply, 18));
};

export default function useGovernanceTokenSupply() {
  const contract = useUnionContract();

  const shouldFetch = Boolean(contract);

  return useSWR(
    shouldFetch ? "GovernanceTokenSupply" : null,
    getGovernanceTokenSupply(contract),
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
