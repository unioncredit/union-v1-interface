import useUnionContract from "hooks/contracts/useUnionContract";
import { useCallback } from "react";

export default function useDelegate() {
  const unionContract = useUnionContract();

  return useCallback(
    async (address) => {
      return unionContract.delegate(address);
    },
    [unionContract]
  );
}
