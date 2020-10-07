import { formatUnits } from "@ethersproject/units";
import { useGovernanceTokenContract } from "hooks/governance/useGovernanceContract";
import useSWR from "swr";

const getUserGovernanceTokenBalance = (contract) => async (_, address) => {
  const balanceOf = await contract.balanceOf(address);

  return parseFloat(formatUnits(balanceOf, 18));
};

export default function useUserGovernanceTokenBalance(address) {
  const tokenContract = useGovernanceTokenContract();

  const shouldFetch = typeof address === "string" && tokenContract;

  return useSWR(
    shouldFetch ? ["UserGovernanceTokenBalance", address] : null,
    getUserGovernanceTokenBalance(tokenContract)
  );
}
