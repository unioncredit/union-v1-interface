import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useCurrentToken from "hooks/useCurrentToken";
import useMemberFee from "hooks/data/useMemberFee";
import { useCallback } from "react";
import { Contract } from "@ethersproject/contracts";
import { signERC2612Permit } from "eth-permit";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

export default function useRegisterMember() {
  const { account, library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const UNION = useCurrentToken("UNION");
  const marketRegistryContract = useMarketRegistryContract();
  let memberFee;
  return useCallback(async (): Promise<TransactionResponse> => {
    let gasLimit: any, userManagerContract: Contract, result: any;
    try {
      const signer = library.getSigner();
      const res = await marketRegistryContract.tokens(tokenAddress);
      const userManagerAddress = res.userManager;
      userManagerContract = new Contract(
        userManagerAddress,
        USER_MANAGER_ABI,
        signer
      );
      memberFee = (await userManagerContract.newMemberFee()).toString();

      result = await signERC2612Permit(
        library,
        UNION,
        account,
        userManagerAddress,
        memberFee
      );

      gasLimit = await userManagerContract.estimateGas.registerMemberWithPermit(
        account,
        memberFee,
        result.deadline,
        result.v,
        result.r,
        result.s
      );
    } catch (err) {
      gasLimit = 300000;
    }

    return userManagerContract.registerMemberWithPermit(
      account,
      memberFee,
      result.deadline,
      result.v,
      result.r,
      result.s,
      {
        gasLimit,
      }
    );
  }, [account, library, tokenAddress, marketRegistryContract]);
}
