import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/timelock.json";
import { TIMELOCK_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useUserContract() {
  const { chainId } = useWeb3React();
  return useContract(TIMELOCK_ADDRESSES[chainId], ABI);
}
