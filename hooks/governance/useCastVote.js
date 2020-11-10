import { useCallback } from "react";
import useGovernanceContract from "../contracts/useGovernanceContract";

export default function useCastVote() {
  const governanceContract = useGovernanceContract();

  return useCallback(
    /**
     * @param {string} proposalId
     * @param {boolean} support
     *
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async (proposalId, support) => {
      return governanceContract.castVote(proposalId, support);
    },
    []
  );
}
