import useSWR from "swr";
import useUnionToken from "hooks/contracts/useUnionToken";

// TODO create useERC20Info hook
const getGovernanceTokenSupply = (contract) => () => {
  return contract.totalSupply();
};

export default function useGovernanceTokenSupply() {
  const contract = useUnionToken();

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
