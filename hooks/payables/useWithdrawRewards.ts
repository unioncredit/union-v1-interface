import type { TransactionResponse } from "@ethersproject/providers";
import useUserContract from "hooks/contracts/useUserContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useWithdrawRewards() {
  const tokenAddress = useCurrentToken();
  const userContract = useUserContract();

  return useCallback(async (): Promise<TransactionResponse> => {
    return userContract.withdrawRewards(tokenAddress);
  }, [tokenAddress, userContract]);
}
