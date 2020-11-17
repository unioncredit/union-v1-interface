import type { TransactionResponse } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useUserContract from "hooks/contracts/useUserContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useApplyMember() {
  const { account } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const memberContract = useUserContract();

  return useCallback(async (): Promise<TransactionResponse> => {
    let gasLimit: any;
    try {
      gasLimit = await memberContract.estimateGas.applyMember(
        account,
        tokenAddress
      );
    } catch (err) {
      gasLimit = 150000;
    }

    return memberContract.applyMember(account, tokenAddress, {
      gasLimit,
    });
  }, [account, tokenAddress, memberContract]);
}
