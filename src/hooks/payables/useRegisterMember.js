import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import usePermits from "hooks/usePermits";
import useUnionToken from "hooks/contracts/useUnionToken";
import { APPROVE_UNION_REGISTER_SIGNATURE_KEY } from "constants/app";
import useUserManager from "hooks/contracts/useUserManager";

export default function useRegisterMember() {
  const { getPermit } = usePermits();
  const { account } = useWeb3React();
  const DAI = useToken();
  const userManager = useUserManager(DAI);
  const unionToken = useUnionToken();

  return useCallback(async () => {
    const permit = getPermit(APPROVE_UNION_REGISTER_SIGNATURE_KEY);
    const memberFee = await userManager.newMemberFee();

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
  }, [account, userManager, unionToken]);
}
