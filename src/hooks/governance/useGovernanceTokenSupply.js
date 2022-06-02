import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";
import useUnionToken from "hooks/contracts/useUnionToken";

// TODO return big number
// TODO create useERC20Info hook
const getGovernanceTokenSupply = (contract) => async () => {
  const totalSupply = await contract.totalSupply();
  return parseFloat(formatUnits(totalSupply, 18));
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
