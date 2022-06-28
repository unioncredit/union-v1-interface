import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import usePermits from "hooks/usePermits";
import useUToken from "hooks/contracts/useUToken";
import useERC20 from "hooks/contracts/useERC20";
import { APPROVE_DAI_REPAY_SIGNATURE_KEY } from "constants/app";

export default function useRepay() {
  const { account, chainId } = useWeb3React();
  const { getPermit } = usePermits();

  const DAI = useToken("DAI");
  const DAIContract = useERC20(DAI);
  const uToken = useUToken(DAI);

  return useCallback(
    async (repayAmount) => {
      const permit = getPermit(APPROVE_DAI_REPAY_SIGNATURE_KEY);

      // if we have a valid permit use that to stake
      if (permit) {
        if (chainId == 1) {
          return uToken.repayBorrowWithPermit(
            account,
            repayAmount,
            permit.nonce,
            permit.expiry,
            permit.v,
            permit.r,
            permit.s
          );
        } else {
          return uToken.repayBorrowWithERC20Permit(
            account,
            repayAmount,
            permit.deadline,
            permit.v,
            permit.r,
            permit.s
          );
        }
      }

      const allowance = await DAIContract.allowance(account, uToken.address);
      if (allowance.lt(repayAmount)) {
        throw new Error("Allowance not enough");
      }

      return uToken.repayBorrow(repayAmount);
    },
    [account, uToken, DAIContract, chainId]
  );
}
