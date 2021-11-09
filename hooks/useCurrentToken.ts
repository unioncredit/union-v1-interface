import { AddressZero, TOKENS } from "constants/variables";
import { useMemo } from "react";
import useChainId from "./useChainId";

export default function useCurrentToken(
  symbol: "DAI" | "UNION" | "FUN" = "DAI"
): string {
  const chainId = useChainId();

  return useMemo(() => {
    if (
      chainId &&
      Object.prototype.hasOwnProperty.call(TOKENS, chainId) &&
      Object.prototype.hasOwnProperty.call(TOKENS[chainId], symbol)
    ) {
      return TOKENS[chainId][symbol];
    }
    return AddressZero;
  }, [chainId, symbol]);
}
