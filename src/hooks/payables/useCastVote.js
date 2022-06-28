import { useCallback } from "react";
import useGovernance from "../contracts/useGovernance";

export default function useCastVote() {
  const governanceContract = useGovernance();

  return useCallback(
    async (proposalId, support) => {
      return governanceContract.castVote(proposalId, support);
    },
    [governanceContract]
  );
}
