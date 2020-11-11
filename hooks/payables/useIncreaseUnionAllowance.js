import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { USER_MANAGER_ADDRESSES } from "constants/variables";
import { useCallback } from "react";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useUnionContract from "../contracts/useUnionContract";

export default function useIncreaseUnionAllowance() {
  const { library, chainId, account } = useWeb3React();

  const unionContract = useUnionContract();

  return useCallback(
    /**
     * @param {Number|String} amount
     */
    async (amount) => {
      try {
        /**
         * @type {import("@ethersproject/abstract-provider").TransactionResponse}
         */
        const { hash } = await unionContract.approve(
          USER_MANAGER_ADDRESSES[chainId],
          parseUnits(amount, 18).toString()
        );

        await getReceipt(hash, library);
      } catch (err) {
        handleTxError(err);
      }
    },
    [unionContract, chainId, account]
  );
}
