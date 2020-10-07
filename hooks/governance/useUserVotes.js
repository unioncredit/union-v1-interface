import { formatUnits } from "@ethersproject/units";
import { useGovernanceTokenContract } from "hooks/useGovernanceContract";
import useSWR from "swr";

const getUserVotes = (contract) => async (_, address) => {
  const currentVotes = await contract.getCurrentVotes(address);

  return parseFloat(formatUnits(currentVotes, 18));
};

export default function useUserVotes(address) {
  const govTokenContract = useGovernanceTokenContract();

  const shouldFetch = typeof address === "string" && govTokenContract;

  return useSWR(
    shouldFetch ? ["UserVotes", address] : null,
    getUserVotes(govTokenContract)
  );
}
