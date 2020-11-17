import type { TransactionResponse } from "@ethersproject/providers";
import useUnionContract from "hooks/contracts/useUnionContract";
import { useCallback } from "react";

export default function useDelegate() {
  const unionContract = useUnionContract();

  return useCallback(
    async (address: string): Promise<TransactionResponse> => {
      return unionContract.delegate(address);
    },
    [unionContract]
  );
}
