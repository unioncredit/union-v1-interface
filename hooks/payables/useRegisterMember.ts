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
import { makeTxWithGasEstimate } from "../../util/gasEstimation";
import useUnionContract from "../contracts/useUnionContract";
import usePermits from "hooks/usePermits";
import { APPROVE_UNION_REGISTER_SIGNATURE_KEY } from "constants/app";

export default function useRegisterMember() {
  const { account, library } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();
  const unionContract: Contract = useUnionContract();
  const { getPermit } = usePermits();

  const permit = getPermit(APPROVE_UNION_REGISTER_SIGNATURE_KEY);

  return useCallback(async (): Promise<TransactionResponse> => {
    const signer = library.getSigner();
    const { userManager: userManagerAddress } =
      await marketRegistryContract.tokens(tokenAddress);
    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      signer
    );

    const memberFee = (await userManagerContract.newMemberFee()).toString();

    if (permit) {
      return makeTxWithGasEstimate(
        userManagerContract,
        "registerMemberWithPermit",
        [account, memberFee, permit.deadline, permit.v, permit.r, permit.s]
      );
    }

    const allowance = await unionContract.allowance(
      account,
      userManagerAddress
    );

    if (allowance.lt(memberFee)) {
      throw new Error("Allowance not enough");
    }

    return await makeTxWithGasEstimate(userManagerContract, "registerMember", [
      account,
    ]);
  }, [account, library, tokenAddress, marketRegistryContract]);
}
