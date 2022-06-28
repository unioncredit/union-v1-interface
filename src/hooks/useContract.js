import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";

import useReadProvider from "hooks/useReadProvider";

export default function useContract(address, ABI) {
  const readProvider = useReadProvider();
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !isAddress(address)) return null;

    const provider =
      account && library ? library.getSigner(account) : readProvider;

    if (!provider) return null;

    return new Contract(address, ABI, provider);
  }, [address, ABI, library, account, readProvider]);
}
