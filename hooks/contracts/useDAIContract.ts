import { useWeb3React } from "@web3-react/core";
import ERC20_TOKEN_ABI from "constants/abis/erc20Detailed.json";
import { TOKENS } from "constants/variables";
import useContract from "../useContract";

export default function useUnionContract() {
  const { chainId } = useWeb3React();
  const shouldFetch =
    chainId && TOKENS && TOKENS[chainId] && TOKENS[chainId].DAI;

  return useContract(TOKENS[chainId]?.DAI, ERC20_TOKEN_ABI);
}
