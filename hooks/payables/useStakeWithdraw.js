import { parseUnits } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import useUserContract from "hooks/contracts/useUserContract";
import { useCallback } from "react";

export default function useStakeWithdraw() {
  const userContract = useUserContract();
  const tokenAddress = useCurrentToken();

  return useCallback(
    /**
     * @param {String|Number} amount
     *
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async (amount) => {
      const stakeAmount = parseUnits(String(amount), 18);

      return userContract.unstake(tokenAddress, stakeAmount.toString());
    },
    [userContract, tokenAddress]
  );
}
