import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import { U_TOKEN_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useUnionContract() {
  const { chainId } = useWeb3React();

  return useContract(U_TOKEN_ADDRESSES[chainId], U_TOKEN_ABI);
}
