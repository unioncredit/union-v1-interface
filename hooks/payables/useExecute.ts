import type { TransactionResponse } from "@ethersproject/providers";
import { useCallback } from "react";
import useGovernanceContract from "../contracts/useGovernanceContract";

export default function useExecute() {
  const governanceContract = useGovernanceContract();

  return useCallback(
    async (proposalId: string): Promise<TransactionResponse> => {
      return governanceContract.execute(proposalId);
    },
    [governanceContract]
  );
}
