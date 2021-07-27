import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { signDaiPermit } from "eth-permit";

export default function useDaiPermit() {
  const { chainId } = useWeb3React();

  return useCallback(
    async (
      provider: any,
      tokenAddress: string,
      holder: string,
      spender: string,
      expiry?: number,
      nonce?: number
    ) => {
      if (chainId === 1 || chainId === 4) {
        return await signDaiPermit(
          provider,
          tokenAddress,
          holder,
          spender,
          expiry,
          nonce
        );
      } else {
        throw new Error("Does not support permit method");
      }
    },
    [chainId]
  );
}
