import { MaxUint256 } from "@ethersproject/constants";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { USER_MANAGER_ADDRESSES } from "constants/variables";
import useUserContract from "hooks/useUserContract";
import useTokenContract from "hooks/useTokenContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useStakeDeposit() {
  const { account, chainId } = useWeb3React();
  const userContract = useUserContract();

  const tokenAddress = useCurrentToken();
  const tokenContract = useTokenContract(tokenAddress);

  return useCallback(
    /**
     * @param {String|Number} amount
     *
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async (amount) => {
      const stakeAmount = parseUnits(String(amount), 18);

      const allowance = await tokenContract.allowance(
        account,
        USER_MANAGER_ADDRESSES[chainId]
      );

      if (allowance.lt(stakeAmount))
        await tokenContract.approve(
          USER_MANAGER_ADDRESSES[chainId],
          MaxUint256
        );

      let gasLimit;
      try {
        gasLimit = await userContract.estimateGas.stake(
          tokenAddress,
          stakeAmount.toString()
        );
      } catch (err) {
        gasLimit = 3000000;
      }

      return userContract.stake(tokenAddress, stakeAmount.toString(), {
        gasLimit,
      });
    },
    []
  );
}
