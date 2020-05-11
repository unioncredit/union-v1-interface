import ABI from "@constants/abis/lendingMarket.json";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";
import getContract from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

export default function useMarketContract(tokenAddress) {
  const { library, chainId } = useWeb3React();

  return useAutoMemo(async () => {
    try {
      const marketAddress = await getMarketAddress(
        tokenAddress,
        library.getSigner(),
        chainId
      );

      return getContract(marketAddress, ABI, library.getSigner());
    } catch (err) {
      console.error(err);
      return null;
    }
  });
}
