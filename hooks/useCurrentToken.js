import { AddressZero, TOKENS } from "@constants/index";
import { useWeb3React } from "@web3-react/core";

/**
 * @name useCurrentToken
 *
 * @param {("DAI"|"UNION")} symbol
 */
export default function useCurrentToken(symbol = "DAI") {
  const { chainId } = useWeb3React();

  if (
    chainId &&
    TOKENS.hasOwnProperty(chainId) &&
    TOKENS[chainId].hasOwnProperty(symbol)
  ) {
    return TOKENS[chainId][symbol];
  }

  return AddressZero;
}
