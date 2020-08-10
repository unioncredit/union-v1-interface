import { MaxUint256 } from "@ethersproject/constants";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { STAKING_MANAGER_ADDRESSES } from "constants/variables";
import useCurrentToken from "hooks/useCurrentToken";
import useStakingContract from "hooks/contracts/useStakingContract";
import useTokenContract from "hooks/contracts/useTokenContract";
import { useCallback } from "react";

export default function useStakeDeposit() {
  const { account, chainId } = useWeb3React();
  const stakingContract = useStakingContract();

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
        STAKING_MANAGER_ADDRESSES[chainId]
      );

      if (allowance.lt(stakeAmount))
        await tokenContract.approve(
          STAKING_MANAGER_ADDRESSES[chainId],
          MaxUint256
        );

      let gasLimit;
      try {
        gasLimit = await stakingContract.estimateGas.stake(
          tokenAddress,
          stakeAmount.toString()
        );
      } catch (err) {
        gasLimit = 3000000;
      }

      return stakingContract.stake(tokenAddress, stakeAmount.toString(), {
        gasLimit,
      });
    },
    []
  );
}
