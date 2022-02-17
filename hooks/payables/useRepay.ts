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
import { APPROVE_DAI_REPAY_SIGNATURE_KEY } from "constants/app";
import usePermits from "hooks/usePermits";

export default function useRepay() {
  const { library, account, chainId } = useWeb3React();
  const DAI = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();
  const DAIContract = useERC20Contract(DAI);
  const { getPermit } = usePermits();

  const permit = getPermit(APPROVE_DAI_REPAY_SIGNATURE_KEY);

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

      // if we have a valid permit use that to stake
      if (permit) {
        if (chainId == 1) {
          return makeTxWithGasEstimate(
            uTokenContract,
            "repayBorrowWithPermit",
            [
              account,
              repayAmount.toString(),
              permit.nonce,
              permit.expiry,
              permit.v,
              permit.r,
              permit.s,
            ]
          );
        } else {
          return makeTxWithGasEstimate(
            uTokenContract,
            "repayBorrowWithERC20Permit",
            [
              account,
              repayAmount.toString(),
              permit.deadline,
              permit.v,
              permit.r,
              permit.s,
            ]
          );
        }
      }

      const allowance = await DAIContract.allowance(account, uTokenAddress);
      if (allowance.lt(repayAmount)) {
        throw new Error("Allowance not enough");
      }

      return makeTxWithGasEstimate(uTokenContract, "repayBorrow", [
        repayAmount,
      ]);
    },
    [account, DAI, marketRegistryContract, DAIContract, permit]
  );
}
