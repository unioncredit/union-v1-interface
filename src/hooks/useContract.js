import { isAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract(address, ABI, provider) {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (BigNumber.from(address).eq("0")) {
      return undefined;
    }

    const lib = provider
      ? provider
      : account
      ? library?.getSigner(account)
      : library;

    return isAddress(address) && !!ABI && !!lib
      ? new Contract(address, ABI, lib)
      : undefined;
  }, [address, ABI, library, account, provider]);
}
