import { Contract } from "@ethersproject/contracts";
import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useERC20Contract from "hooks/contracts/useERC20Contract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import { makeTxWithGasEstimate } from "../../util/gasEstimation";
import usePermits from "hooks/usePermits";
import { APPROVE_DAI_DEPOSIT_SIGNATURE_KEY } from "constants/app";

export default function useStakeDeposit() {
  const { account, chainId, library } = useWeb3React();
  const marketRegistryContract = useMarketRegistryContract();
  const DAI = useCurrentToken();
  const DAIContract = useERC20Contract(DAI);
  const { getPermit } = usePermits();

  const permit = getPermit(APPROVE_DAI_DEPOSIT_SIGNATURE_KEY);

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const signer = library.getSigner();
      const res = await marketRegistryContract.tokens(DAI);
      const userManagerAddress = res.userManager;
      const userManagerContract = new Contract(
        userManagerAddress,
        USER_MANAGER_ABI,
        signer
      );
      const stakeAmount = parseUnits(String(amount), 18);

      // if we have a valid permit use that to stake
      if (permit) {
        if (chainId == 1) {
          return makeTxWithGasEstimate(userManagerContract, "stakeWithPermit", [
            stakeAmount.toString(),
            permit.nonce,
            permit.expiry,
            permit.v,
            permit.r,
            permit.s,
          ]);
        } else {
          return makeTxWithGasEstimate(
            userManagerContract,
            "stakeWithERC20Permit",
            [
              stakeAmount.toString(),
              permit.deadline,
              permit.v,
              permit.r,
              permit.s,
            ]
          );
        }
      }

      const allowance = await DAIContract.allowance(
        account,
        userManagerAddress
      );

      if (allowance.lt(stakeAmount)) {
        throw new Error("Allowance not enough");
      }

      return makeTxWithGasEstimate(userManagerContract, "stake", [stakeAmount]);
    },
    [account, chainId, DAI, DAIContract, marketRegistryContract, permit]
  );
}
