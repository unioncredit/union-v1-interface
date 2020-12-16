import { MaxUint256 } from "@ethersproject/constants";
import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { USER_MANAGER_ADDRESSES } from "constants/variables";
import useERC20Contract from "hooks/contracts/useERC20Contract";
import useUserContract from "hooks/contracts/useUserContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useStakeDeposit() {
  const { account, chainId } = useWeb3React();
  const userContract = useUserContract();

  const DAI = useCurrentToken();
  const DAIContract = useERC20Contract(DAI);

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const stakeAmount = parseUnits(String(amount), 18);

      const allowance = await DAIContract.allowance(
        account,
        USER_MANAGER_ADDRESSES[chainId]
      );

      if (allowance.lt(stakeAmount))
        await DAIContract.approve(USER_MANAGER_ADDRESSES[chainId], MaxUint256);

      let gasLimit: any;
      try {
        gasLimit = await userContract.estimateGas.stake(
          DAI,
          stakeAmount.toString()
        );
      } catch (err) {
        gasLimit = 800000;
      }

      return userContract.stake(DAI, stakeAmount.toString(), {
        gasLimit,
      });
    },
    [account, chainId, userContract, DAI, DAIContract]
  );
}