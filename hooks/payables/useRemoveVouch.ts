import type { TransactionResponse } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

export default function useRemoveVouch() {
  const { account, library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  return useCallback(
    async (memberAddress: string): Promise<TransactionResponse> => {
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

        gasLimit = await userManagerContract.estimateGas.cancelVouch(
          account,
          memberAddress
        );
      } catch (err) {
        gasLimit = 300000;
      }

      return userManagerContract.cancelVouch(account, memberAddress, {
        gasLimit,
      });
    },
    [account, library, tokenAddress, marketRegistryContract]
  );
}
