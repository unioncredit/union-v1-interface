import { useWeb3React } from "@web3-react/core";
import { AddressZero, TOKENS } from "constants/variables";
import { useMemo } from "react";

/**
 * @name useCurrentToken
 *
 * @param {("DAI"|"UNION")} symbol
 */
export default function useCurrentToken(symbol = "DAI") {
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
