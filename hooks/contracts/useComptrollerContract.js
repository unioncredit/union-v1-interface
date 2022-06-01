import ABI from "constants/abis/comptroller.json";
import { COMPTROLLER_ADDRESSES } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useComptrollerContract(provider) {
  const chainId = useChainId();

  return useContract(COMPTROLLER_ADDRESSES[chainId], ABI, provider);
}
