import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

export default function useContract(address, ABI) {
  const { library, account } = useWeb3React();

  return useAutoMemo(() =>
    isAddress(address) && !!ABI && !!library
      ? new Contract(address, ABI, library.getSigner(account))
      : undefined
  );
}
