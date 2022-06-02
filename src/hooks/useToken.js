import useChainId from "hooks/useChainId";
import { AddressZero, TOKENS } from "constants/variables";

export default function useToken(symbol = "DAI") {
  const chainId = useChainId();
  return TOKENS?.[chainId]?.[symbol] || AddressZero;
}
