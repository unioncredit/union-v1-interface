import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/controller.json";
import { CONTROLLER_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useControllerContract() {
  const { chainId } = useWeb3React();

  return useContract(CONTROLLER_ADDRESSES[chainId], ABI);
}
