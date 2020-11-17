import { Contract } from "@ethersproject/contracts";
import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useBorrow() {
  const { library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const marketAddress = await marketRegistryContract.tokens(tokenAddress);

      const lendingMarketContract = new Contract(
        marketAddress,
        LENDING_MARKET_ABI,
        library.getSigner()
      );

      const borrowAmount = parseUnits(String(amount), 18);

      let gasLimit: any;
      try {
        gasLimit = await lendingMarketContract.estimateGas.borrow(
          borrowAmount.toString()
        );
      } catch (err) {
        gasLimit = 1000000;
      }

      return lendingMarketContract.borrow(borrowAmount.toString(), {
        gasLimit,
      });
    },
    [tokenAddress, marketRegistryContract]
  );
}
