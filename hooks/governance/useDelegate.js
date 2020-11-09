import { useCallback } from "react";
import { useGovernanceTokenContract } from "./useGovernanceContract";

export default function useDelegate() {
  const governanceTokenContract = useGovernanceTokenContract();

  return useCallback(
    /**
     * @param {string} address
     *
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async (address) => {
      return governanceTokenContract.delegate(address);
    }
  );
}
