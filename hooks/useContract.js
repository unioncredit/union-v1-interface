import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract(address, ABI) {
  const { library, account } = useWeb3React();

  return useMemo(
    () =>
      isAddress(address) && !!ABI && !!library
        ? new Contract(address, ABI, library.getSigner(account))
        : undefined,
    [address, ABI, library, account]
  );
}
