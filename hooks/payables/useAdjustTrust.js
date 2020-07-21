import { parseUnits } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import useMemberContract from "hooks/useMemberContract";
import { useCallback } from "react";

export default function useAdjustTrust() {
  const tokenAddress = useCurrentToken();
  const memberContract = useMemberContract();

  return useCallback(async (memberAddress, amount) => {
    const trustAmount = parseUnits(String(amount), 18);

    let gasLimit;
    try {
      gasLimit = await memberContract.estimateGas.updateTrust(
        memberAddress,
        tokenAddress,
        trustAmount.toString()
      );
    } catch (err) {
      gasLimit = 300000;
    }

    return memberContract.updateTrust(
      memberAddress,
      tokenAddress,
      trustAmount.toString(),
      {
        gasLimit,
      }
    );
  }, []);
}
