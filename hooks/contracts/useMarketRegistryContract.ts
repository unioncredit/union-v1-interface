import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/marketRegistry.json";
import { MARKET_REGISTRY_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useMarketRegistryContract() {
  const { chainId } = useWeb3React();

  return useContract(MARKET_REGISTRY_ADDRESSES[chainId], ABI);
}
