import type { TransactionResponse } from "@ethersproject/providers";
import { useCallback } from "react";
import useGovernanceContract from "../contracts/useGovernanceContract";
import { BigNumberish } from "@ethersproject/bignumber";

export default function useCastVote() {
  const governanceContract = useGovernanceContract();

  return useCallback(
    async (
      proposalId: string,
      support: BigNumberish
    ): Promise<TransactionResponse> => {
      return governanceContract.castVote(proposalId, support);
    },
    [governanceContract]
  );
}
