import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useContract from "hooks/useContract";
import { UNION_WRAPPED_TOKEN_ADDRESSES } from "constants/variables";

import ABI from "constants/abis/wrappedUnion.json";

export default function useUnwrapUnion() {
  const { chainId } = useWeb3React();

  const wrappedUnion = useContract(UNION_WRAPPED_TOKEN_ADDRESSES[chainId], ABI);

  return useCallback(() => {
    alert("unwrap");
  }, [wrappedUnion]);
}
