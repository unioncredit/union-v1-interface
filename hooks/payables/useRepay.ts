import { Contract } from "@ethersproject/contracts";
import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useERC20Contract from "hooks/contracts/useERC20Contract";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { signDaiPermit } from "eth-permit";

export default function useRepay() {
  const { library, account } = useWeb3React();
  const DAI = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();
  const DAIContract = useERC20Contract(DAI);

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const marketAddress = await marketRegistryContract.tokens(DAI);

      const lendingMarketContract = new Contract(
        marketAddress,
        LENDING_MARKET_ABI,
        library.getSigner()
      );

      const repayAmount = parseUnits(String(amount), 18);

      const result = await signDaiPermit(
        library.provider,
        DAI,
        account,
        marketAddress
      );

      let gasLimit: any;
      try {
        gasLimit = await lendingMarketContract.estimateGas.repayWithPermit(
          account,
          repayAmount.toString(),
          result.nonce,
          result.expiry,
          result.v,
          result.r,
          result.s
        );
      } catch (err) {
        gasLimit = 800000;
      }

      return lendingMarketContract.repayWithPermit(
        account,
        repayAmount.toString(),
        result.nonce,
        result.expiry,
        result.v,
        result.r,
        result.s,
        {
          gasLimit,
        }
      );
    },
    [account, DAI, marketRegistryContract, DAIContract]
  );
}
