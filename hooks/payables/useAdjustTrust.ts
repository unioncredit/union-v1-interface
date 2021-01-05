import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

export default function useAdjustTrust() {
  const tokenAddress = useCurrentToken();
  const { library } = useWeb3React();
  const marketRegistryContract = useMarketRegistryContract();

  return useCallback(
    async (
      memberAddress: string,
      amount: number | string
    ): Promise<TransactionResponse> => {
      const trustAmount = parseUnits(String(amount), 18);

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

        gasLimit = await userManagerContract.estimateGas.updateTrust(
          memberAddress,
          tokenAddress,
          trustAmount.toString()
        );
      } catch (err) {
        gasLimit = 300000;
      }

      return userManagerContract.updateTrust(
        memberAddress,
        tokenAddress,
        trustAmount.toString(),
        {
          gasLimit,
        }
      );
    },
    [library, marketRegistryContract, tokenAddress]
  );
}
