import { useWeb3React } from "@web3-react/core";
import UNION_TOKEN_ABI from "constants/abis/unionToken.json";
import { UNION_TOKEN_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useUnionContract() {
  const { chainId } = useWeb3React();

  return useContract(UNION_TOKEN_ADDRESSES[chainId], UNION_TOKEN_ABI);
}
