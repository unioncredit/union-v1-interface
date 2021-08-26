import { isAddress } from "@ethersproject/address";
import type { ContractInterface } from "@ethersproject/contracts";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract(address: string, ABI: ContractInterface) {
  const { library, account } = useWeb3React();

  return useMemo(
    () =>
      isAddress(address) && !!ABI && !!library
        ? new Contract(
            address,
            ABI,
            account ? library.getSigner(account) : library
          )
        : undefined,
    [address, ABI, library, account]
  );
}
