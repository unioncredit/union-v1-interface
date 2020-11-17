import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import useUserContract from "hooks/contracts/useUserContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useStakeWithdraw() {
  const userContract = useUserContract();
  const tokenAddress = useCurrentToken();

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const stakeAmount = parseUnits(String(amount), 18);

      return userContract.unstake(tokenAddress, stakeAmount.toString());
    },
    [userContract, tokenAddress]
  );
}
