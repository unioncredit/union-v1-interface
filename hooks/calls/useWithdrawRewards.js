import { useWeb3React } from "@web3-react/core";
import useCurrentToken from "hooks/useCurrentToken";
import useUnionContract from "hooks/contracts/useUnionContract";
import { useCallback } from "react";

export default function useWithdrawRewards() {
  const { account } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const unionContract = useUnionContract();

  return useCallback(
    /**
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async () => {
      return unionContract.withdrawRewards(account, tokenAddress);
    },
    []
  );
}
