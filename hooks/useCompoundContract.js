import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/compoundAdapter.json";
import { COMPOUND_ADAPTER_ADDRESSES } from "constants/variables";
import useContract from "./useContract";

export default function useCompoundContract() {
  const { chainId } = useWeb3React();

  return useContract(COMPOUND_ADAPTER_ADDRESSES[chainId], ABI);
}
