import useCurrentToken from "hooks/useCurrentToken";
import useUserContract from "hooks/contracts/useUserContract";
import { useCallback } from "react";

export default function useWithdrawRewards() {
  const tokenAddress = useCurrentToken();
  const userContract = useUserContract();

  return useCallback(
    /**
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async () => {
      return userContract.withdrawRewards(tokenAddress);
    },
    []
  );
}
