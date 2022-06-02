import { useCallback } from "react";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

export default function useWithdrawRewards() {
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  return useCallback(async () => {
    return userManager.withdrawRewards();
  }, [library, tokenAddress, marketRegistryContract]);
}
