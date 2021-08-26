import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useCurrentToken from "hooks/useCurrentToken";
import useMemberFee from "hooks/data/useMemberFee";
import { useCallback } from "react";
import { Contract } from "@ethersproject/contracts";
import { signERC2612Permit } from "util/eth-permit";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import { makeTxWithGasEstimate } from "../../util/gasEstimation";
import useUnionContract from '../contracts/useUnionContract';

export default function useRegisterMember() {
  const { account, library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const UNION = useCurrentToken("UNION");
  const marketRegistryContract = useMarketRegistryContract();
  const unionContract: Contract = useUnionContract();
  let memberFee;
  return useCallback(async (): Promise<TransactionResponse> => {
    const signer = library.getSigner();
    const { userManager: userManagerAddress } = await marketRegistryContract.tokens(tokenAddress);
    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      signer
    );
    memberFee = (await userManagerContract.newMemberFee()).toString();
    try {
      console.log("requesting signature", library.provider.chainId, UNION, account, userManagerAddress, memberFee);
      const result = await signERC2612Permit(
        library,
        UNION,
        account,
        userManagerAddress,
        memberFee
      );
      const {deadline, nonce, owner, spender, value, r, s, v} = result;
      console.log("signature result", deadline, nonce, owner, spender, value, r, s, v)

      return makeTxWithGasEstimate(
        userManagerContract,
        'registerMemberWithPermit',
        [
          account,
          memberFee,
          result.deadline,
          result.v,
          result.r,
          result.s
        ]
      );
    } catch (err) {
      await makeTxWithGasEstimate(
        unionContract,
        'approve',
        [userManagerAddress, memberFee]
      );
      return await makeTxWithGasEstimate(
        userManagerContract,
        'registerMember',
        [account]
      );
    }
  }, [account, library, tokenAddress, marketRegistryContract]);
}
