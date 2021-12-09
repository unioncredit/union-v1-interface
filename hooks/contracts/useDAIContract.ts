import ERC20_TOKEN_ABI from "constants/abis/erc20Detailed.json";
import { TOKENS } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useUnionContract(provider?: any) {
  const chainId = useChainId();

  return useContract(TOKENS[chainId]?.DAI, ERC20_TOKEN_ABI, provider);
}
