import { Contract } from "@ethersproject/contracts";
import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKENT_ABI from "constants/abis/uToken.json";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";

export default function useBorrow() {
  const { library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const res = await marketRegistryContract.tokens(tokenAddress);
      const uTokenAddress = res.uToken;

      const uTokenContract = new Contract(
        uTokenAddress,
        U_TOKENT_ABI,
        library.getSigner()
      );

      const borrowAmount = parseUnits(String(amount), 18);

      let gasLimit: any;
      try {
        const estimateGas = await uTokenContract.estimateGas.borrow(
          borrowAmount.toString()
        );
        gasLimit = (parseFloat(estimateGas.toString()) * 1.1).toFixed(0);
      } catch (err) {
        gasLimit = 1000000;
      }

      return uTokenContract.borrow(borrowAmount.toString(), {
        gasLimit,
      });
    },
    [tokenAddress, marketRegistryContract]
  );
}
