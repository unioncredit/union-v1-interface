import { useWeb3React } from "@web3-react/core";
import useCurrentToken from "hooks/useCurrentToken";
import useMemberContract from "hooks/useMemberContract";
import { useCallback } from "react";

export default function useRemoveVouch() {
  const { account } = useWeb3React();
  const tokenAddress = useCurrentToken();
  const memberContract = useMemberContract();

  return useCallback(async (memberAddress) => {
    let gasLimit;
    try {
      gasLimit = await memberContract.estimateGas.cancelVouch(
        account,
        memberAddress,
        tokenAddress
      );
    } catch (err) {
      gasLimit = 300000;
    }

    return memberContract.cancelVouch(account, memberAddress, tokenAddress, {
      gasLimit,
    });
  }, []);
}
