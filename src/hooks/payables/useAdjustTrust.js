import { useCallback } from "react";
import { parseUnits } from "@ethersproject/units";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

export default function useAdjustTrust() {
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  return useCallback(
    async (memberAddress, amount) => {
      const trustAmount = parseUnits(String(amount), 18);
      return userManager.updateTrust(memberAddress, trustAmount);
    },
    [userManager]
  );
}
