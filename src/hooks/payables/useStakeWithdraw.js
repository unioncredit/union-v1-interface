import { useCallback } from "react";
import { parseUnits } from "@ethersproject/units";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

export default function useStakeWithdraw() {
  const DAI = useToken(DAI);
  const userManager = useUserManager(DAI);

  return useCallback(
    async (amount) => {
      const stakeAmount = parseUnits(String(amount), 18);
      return userManager.unstake(stakeAmount);
    },
    [userManager]
  );
}
