import { useWeb3React } from "@web3-react/core";
import { AddressZero, TOKENS } from "constants/variables";
import { useMemo } from "react";

export default function useCurrentToken(
  symbol: "DAI" | "UNION" | "FUN" = "DAI"
): string {
  const { chainId } = useWeb3React();

  return useMemo(() => {
    if (
      chainId &&
      Object.prototype.hasOwnProperty.call(TOKENS, chainId) &&
      Object.prototype.hasOwnProperty.call(TOKENS[chainId], symbol)
    )
      return TOKENS[chainId][symbol];

    return AddressZero;
  }, [chainId, symbol]);
}
