import { useCallback } from "react";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";

import usePermits from "hooks/usePermits";
import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";
import useERC20 from "hooks/contracts/useERC20";
import { APPROVE_DAI_DEPOSIT_SIGNATURE_KEY } from "constants/app";

export default function useStakeDeposit() {
  const { account, chainId } = useWeb3React();
  const { getPermit } = usePermits();

  const DAI = useToken();
  const userManager = useUserManager(DAI);
  const DAIContract = useERC20(DAI);

  return useCallback(
    async (amount) => {
      const permit = getPermit(APPROVE_DAI_DEPOSIT_SIGNATURE_KEY);
      const stakeAmount = parseUnits(String(amount), 18);

      // if we have a valid permit use that to stake
      if (permit) {
        if (chainId == 1 || chainId == 42) {
          return userManager.stakeWithPermit(
            stakeAmount,
            permit.nonce,
            permit.expiry,
            permit.v,
            permit.r,
            permit.s
          );
        } else {
          return userManager.stakeWithERC20Permit(
            stakeAmount,
            permit.deadline,
            permit.v,
            permit.r,
            permit.s
          );
        }
      }

      const allowance = await DAIContract.allowance(
        account,
        userManager.address
      );

      if (allowance.lt(stakeAmount)) {
        throw new Error("Allowance not enough");
      }

      return userManager.stake(stakeAmount);
    },
    [account, chainId, DAI, DAIContract, marketRegistryContract, permit]
  );
}
