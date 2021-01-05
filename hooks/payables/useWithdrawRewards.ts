import type { TransactionResponse } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

export default function useWithdrawRewards() {
  const { library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  return useCallback(async (): Promise<TransactionResponse> => {
    const signer = library.getSigner();
    const res = await marketRegistryContract.tokens(tokenAddress);
    const userManagerAddress = res.userManager;
    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      signer
    );

    return userManagerContract.withdrawRewards();
  }, [library, tokenAddress, marketRegistryContract]);
}
