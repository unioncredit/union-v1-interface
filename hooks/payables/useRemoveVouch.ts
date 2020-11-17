import type { TransactionResponse } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useUserContract from "hooks/contracts/useUserContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useRemoveVouch() {
  const { account } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const memberContract = useUserContract();

  return useCallback(
    async (memberAddress: string): Promise<TransactionResponse> => {
      let gasLimit: any;
      try {
        gasLimit = await memberContract.estimateGas.cancelVouch(
          account,
          memberAddress,
          tokenAddress
        );
      } catch (err) {
        gasLimit = 300000;
      }

      return memberContract.cancelVouch(account, memberAddress, tokenAddress, {
        gasLimit,
      });
    },
    [account, tokenAddress, memberContract]
  );
}
