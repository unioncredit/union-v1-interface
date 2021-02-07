import type { TransactionResponse } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { Contract } from "@ethersproject/contracts";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

export default function useApplyMember() {
  const { account, library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  return useCallback(async (): Promise<TransactionResponse> => {
    let gasLimit: any, userManagerContract: Contract;
    try {
      const signer = library.getSigner();
      const res = await marketRegistryContract.tokens(tokenAddress);
      const userManagerAddress = res.userManager;
      userManagerContract = new Contract(
        userManagerAddress,
        USER_MANAGER_ABI,
        signer
      );

      gasLimit = await userManagerContract.estimateGas.applyMember(account);
    } catch (err) {
      gasLimit = 150000;
    }

    return userManagerContract.applyMember(account, {
      gasLimit,
    });
  }, [account, library, tokenAddress, marketRegistryContract]);
}
