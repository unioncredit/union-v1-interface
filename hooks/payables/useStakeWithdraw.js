import { parseUnits } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import useStakingContract from "hooks/useStakingContract";
import { useCallback } from "react";

export default function useStakeWithdraw() {
  const stakingContract = useStakingContract();
  const tokenAddress = useCurrentToken();

  return useCallback(
    /**
     * @param {String|Number} amount
     *
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async (amount) => {
      const stakeAmount = parseUnits(String(amount), 18);

      return stakingContract.stake(tokenAddress, stakeAmount.toString());
    },
    []
  );
}
