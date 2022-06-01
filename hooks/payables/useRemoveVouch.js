import { useWeb3React } from "@web3-react/core";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import { Contract } from "@ethersproject/contracts";

export default function useRemoveVouch() {
  const { account, library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  return useCallback(
    async (memberAddress) => {
      const signer = library.getSigner();
      const res = await marketRegistryContract.tokens(tokenAddress);
      const userManagerAddress = res.userManager;
      const userManagerContract = new Contract(
        userManagerAddress,
        USER_MANAGER_ABI,
        signer
      );

      return userManagerContract.cancelVouch(account, memberAddress);
    },
    [account, library, tokenAddress, marketRegistryContract]
  );
}
