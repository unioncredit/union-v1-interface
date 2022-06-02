import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

export default function useRemoveVouch() {
  const { account } = useWeb3React();

  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  return useCallback(
    async (memberAddress) => {
      return userManager.cancelVouch(account, memberAddress);
    },
    [account, userManager]
  );
}
