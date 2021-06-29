import type { TransactionResponse } from "@ethersproject/providers";
import { useCallback } from "react";
import useGovernanceContract from "../contracts/useGovernanceContract";

export default function useQueue() {
  const governanceContract = useGovernanceContract();

  return useCallback(
    async (proposalId: string): Promise<TransactionResponse> => {
      return governanceContract.queue(proposalId);
    },
    [governanceContract]
  );
}
