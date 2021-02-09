import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/comptroller.json";
import { COMPTROLLER_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useComptrollerContract() {
  const { chainId } = useWeb3React();

  return useContract(COMPTROLLER_ADDRESSES[chainId], ABI);
}
