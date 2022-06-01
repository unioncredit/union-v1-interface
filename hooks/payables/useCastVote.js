import { useCallback } from "react";
import useGovernanceContract from "../contracts/useGovernanceContract";

export default function useCastVote() {
  const governanceContract = useGovernanceContract();

  return useCallback(
    async (proposalId, support) => {
      return governanceContract.castVote(proposalId, support);
    },
    [governanceContract]
  );
}
