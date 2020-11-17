import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import useUserContract from "hooks/contracts/useUserContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useAdjustTrust() {
  const tokenAddress = useCurrentToken();
  const memberContract = useUserContract();

  return useCallback(
    async (
      memberAddress: string,
      amount: number | string
    ): Promise<TransactionResponse> => {
      const trustAmount = parseUnits(String(amount), 18);

      let gasLimit: any;
      try {
        gasLimit = await memberContract.estimateGas.updateTrust(
          memberAddress,
          tokenAddress,
          trustAmount.toString()
        );
      } catch (err) {
        gasLimit = 300000;
      }

      return memberContract.updateTrust(
        memberAddress,
        tokenAddress,
        trustAmount.toString(),
        {
          gasLimit,
        }
      );
    },
    [memberContract, tokenAddress]
  );
}
