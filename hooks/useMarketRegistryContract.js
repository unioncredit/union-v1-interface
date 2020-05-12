import ABI from "@constants/abis/marketRegistry.json";
import { useWeb3React } from "@web3-react/core";
import { MARKET_REGISTRY_ADDRESSES } from "@constants/index";
import { useAutoMemo } from "hooks.macro";
import getContract from "util/getContract";

export default function useMarketRegistryContract() {
  const { library, chainId } = useWeb3React();

  return useAutoMemo(() => {
    try {
      return getContract(
        MARKET_REGISTRY_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );
    } catch {
      return null;
    }
  });
}
