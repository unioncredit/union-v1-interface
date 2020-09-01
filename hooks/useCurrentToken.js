import { useWeb3React } from "@web3-react/core";
import { AddressZero, TOKENS } from "constants/variables";
import { useAutoMemo } from "hooks.macro";

/**
 * @name useCurrentToken
 *
 * @param {("DAI"|"UNION")} symbol
 */
export default function useCurrentToken(symbol = "DAI") {
  const { chainId } = useWeb3React();

  if (
    chainId &&
    Object.prototype.hasOwnProperty.call(TOKENS, chainId) &&
    Object.prototype.hasOwnProperty.call(TOKENS[chainId], symbol)
  ) {
    return useAutoMemo(() => TOKENS[chainId][symbol]);
  }

  return AddressZero;
}
