import { useWeb3React } from "@web3-react/core";
import useCurrentToken from "hooks/useCurrentToken";
import useUserContract from "hooks/contracts/useUserContract";
import { useCallback } from "react";

export default function useApplyMember() {
  const { account } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const memberContract = useUserContract();

  return useCallback(
    /**
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async () => {
      let gasLimit;
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
    },
    [account, tokenAddress, memberContract]
  );
}
