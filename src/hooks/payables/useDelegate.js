import useUnionToken from "hooks/contracts/useUnionToken";
import { useCallback } from "react";

export default function useDelegate() {
  const unionToken = useUnionToken();

  return useCallback(
    async (address) => {
      return unionToken.delegate(address);
    },
    [unionToken]
  );
}
