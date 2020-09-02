import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { MEMBER_MANAGER_ADDRESSES } from "constants/variables";
import { useAutoCallback } from "hooks.macro";
import useSWR from "swr";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import parseRes from "util/parseRes";
import useUnionContract from "./useUnionContract";

const getUnionAllowance = (contract) => async (_, account, chainId) => {
  const res = await contract.allowance(
    account,
    MEMBER_MANAGER_ADDRESSES[chainId]
  );

  return parseRes(res);
};

export default function useUnionAllowance() {
  const { account, chainId } = useWeb3React();

  const contract = useUnionContract();

  const shouldFetch =
    !!contract && typeof account === "string" && typeof chainId === "number";

  return useSWR(
    shouldFetch ? ["UnionAllowance", account, chainId] : null,
    getUnionAllowance(contract),
    {
      dedupingInterval: 10 * 1000,
      refreshInterval: 10 * 1000,
    }
  );
}

export function useIncreaseUnionAllowance() {
  const { library, chainId } = useWeb3React();

  const unionContract = useUnionContract();

  const increase = useAutoCallback(
    /**
     * @param {Number|String} amount
     */
    async (amount) => {
      try {
        /**
         * @type {import("@ethersproject/abstract-provider").TransactionResponse}
         */
        const { hash } = await unionContract.approve(
          MEMBER_MANAGER_ADDRESSES[chainId],
          parseUnits(amount, 18).toString()
        );

        await getReceipt(hash, library);
      } catch (err) {
        handleTxError(err);
      }
    }
  );

  return increase;
}
