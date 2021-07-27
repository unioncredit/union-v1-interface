import { Contract } from "@ethersproject/contracts";
import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKENT_ABI from "constants/abis/uToken.json";
import useERC20Contract from "hooks/contracts/useERC20Contract";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { makeTxWithGasEstimate } from "../../util/gasEstimation";
import { MaxUint256 } from "@ethersproject/constants";
import useDaiPermit from "hooks/payables/useDaiPermit";

export default function useRepay() {
  const { library, account } = useWeb3React();
  const DAI = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();
  const DAIContract = useERC20Contract(DAI);
  const daiPermit = useDaiPermit();

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const res = await marketRegistryContract.tokens(DAI);
      const uTokenAddress = res.uToken;

      const uTokenContract = new Contract(
        uTokenAddress,
        U_TOKENT_ABI,
        library.getSigner()
      );

      const repayAmount = parseUnits(String(amount), 18);
      const allowance = await DAIContract.allowance(account, uTokenAddress);
      if (allowance.lt(repayAmount)) {
        try {
          const { nonce, expiry, v, r, s } = await daiPermit(
            library.provider,
            DAI,
            account,
            uTokenAddress
          );

          return makeTxWithGasEstimate(
            uTokenContract,
            "repayBorrowWithPermit",
            [account, repayAmount.toString(), nonce, expiry, v, r, s]
          );
        } catch (err) {
          await makeTxWithGasEstimate(DAIContract, "approve", [
            uTokenAddress,
            MaxUint256,
          ]);
        }
      }

      return makeTxWithGasEstimate(uTokenContract, "repayBorrow", [
        repayAmount,
      ]);
    },
    [account, DAI, marketRegistryContract, DAIContract]
  );
}
