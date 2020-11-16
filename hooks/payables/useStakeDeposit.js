import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useERC20Contract from "hooks/contracts/useERC20Contract";
import useUserContract from "hooks/contracts/useUserContract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { signDaiPermit } from "eth-permit";

export default function useStakeDeposit() {
  const { account, chainId, library } = useWeb3React();
  const userContract = useUserContract();

  const DAI = useCurrentToken();
  const DAIContract = useERC20Contract(DAI);

  return useCallback(
    /**
     * @param {String|Number} amount
     *
     * @returns {Promise<import("@ethersproject/abstract-provider").TransactionResponse>}
     */
    async (amount) => {
      const stakeAmount = parseUnits(String(amount), 18);

      const result = await signDaiPermit(
        library.provider,
        DAI,
        account,
        userContract.address
      );

      let gasLimit;
      try {
        gasLimit = await userContract.estimateGas.stakeWithPermit(
          DAI,
          stakeAmount.toString(),
          result.nonce,
          result.expiry,
          result.v,
          result.r,
          result.s
        );
      } catch (err) {
        gasLimit = 800000;
      }

      return userContract.stakeWithPermit(
        DAI,
        stakeAmount.toString(),
        result.nonce,
        result.expiry,
        result.v,
        result.r,
        result.s,
        {
          gasLimit,
        }
      );
    },
    [account, chainId, userContract, DAI, DAIContract]
  );
}
