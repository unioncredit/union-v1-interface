import { formatUnits } from "@ethersproject/units";
import { useGovernanceTokenContract } from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";

const getGovernanceTokenSupply = (contract) => async () => {
  const totalSupply = await contract.totalSupply();

  return parseFloat(formatUnits(totalSupply, 18));
};

export default function useGovernanceTokenSupply() {
  const tokenContract = useGovernanceTokenContract();

  const shouldFetch = Boolean(tokenContract);

  return useSWR(
    shouldFetch ? "GovernanceTokenSupply" : null,
    getGovernanceTokenSupply(tokenContract),
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
