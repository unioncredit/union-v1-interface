import useUnionContract from "hooks/contracts/useUnionContract";
import { useCallback } from "react";

export default function useDelegate() {
  const unionContract = useUnionContract();

  return useCallback(
    /**
     * @param {string} address
     *
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async (address) => {
      return unionContract.delegate(address);
    },
    [unionContract]
  );
}
