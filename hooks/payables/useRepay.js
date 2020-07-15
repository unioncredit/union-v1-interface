import { MaxUint256 } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useCurrentToken from "hooks/useCurrentToken";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useTokenContract from "hooks/contracts/useTokenContract";
import { useCallback } from "react";

export default function useRepay() {
  const { library, account } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();
  const tokenContract = useTokenContract(tokenAddress);

  return useCallback(async (amount) => {
    const marketAddress = await marketRegistryContract.tokens(tokenAddress);

    const lendingMarketContract = new Contract(
      marketAddress,
      LENDING_MARKET_ABI,
      library.getSigner()
    );

    const repayAmount = parseUnits(String(amount), 18);

    const allowance = await tokenContract.allowance(account, marketAddress);

    if (allowance.lt(repayAmount))
      await tokenContract.approve(marketAddress, MaxUint256);

    let gasLimit;
    try {
      gasLimit = await lendingMarketContract.estimateGas.repay(
        account,
        repayAmount.toString()
      );
    } catch (err) {
      gasLimit = 3000000;
    }

    return lendingMarketContract.repay(account, repayAmount.toString(), {
      gasLimit,
    });
  }, []);
}
