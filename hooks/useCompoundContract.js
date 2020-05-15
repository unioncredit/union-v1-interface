import ABI from "constants/abis/compoundAdapter.json";
import getContract from "util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";
import { COMPOUND_ADAPTER_ADDRESSES } from "constants/variables";

export default function useCompoundContract() {
  const { library, chainId } = useWeb3React();

  return useAutoMemo(() => {
    try {
      return getContract(
        COMPOUND_ADAPTER_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );
    } catch {
      return null;
    }
  });
}
