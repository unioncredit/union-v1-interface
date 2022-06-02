import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import usePermits from "hooks/usePermits";
import useUnionToken from "hooks/contracts/useUnionToken";
import { APPROVE_UNION_REGISTER_SIGNATURE_KEY } from "constants/app";

export default function useRegisterMember() {
  const { account, library } = useWeb3React();
  const DAI = useToken();
  const unionToken = useUnionToken(DAI);
  const { getPermit } = usePermits();

  return useCallback(async () => {
    const permit = getPermit(APPROVE_UNION_REGISTER_SIGNATURE_KEY);
    const memberFee = await userManagerContract.newMemberFee();

    if (permit) {
      return userManager.registerMemberWithPermit(
        account,
        memberFee,
        permit.deadline,
        permit.v,
        permit.r,
        permit.s
      );
    }

    const allowance = await unionToken.allowance(account, userManager.address);

    if (allowance.lt(memberFee)) {
      throw new Error("Allowance not enough");
    }

    return userManager.registerMember(account);
  }, [account, library, tokenAddress, marketRegistryContract, permit]);
}
