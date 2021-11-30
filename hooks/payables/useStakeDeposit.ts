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

export default function useStakeDeposit() {
  const { account, chainId, library } = useWeb3React();
  const marketRegistryContract = useMarketRegistryContract();
  const DAI = useCurrentToken();
  const DAIContract = useERC20Contract(DAI);

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

      const allowance = await DAIContract.allowance(
        account,
        userManagerAddress
      );
      //Approve is not required to call stakeWithPermit
      if (allowance.lt(stakeAmount)) {
        throw new Error("Allowance not enough");
      }

      return makeTxWithGasEstimate(userManagerContract, "stake", [stakeAmount]);
    },
    [account, chainId, DAI, DAIContract, marketRegistryContract]
  );
}
