import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { MEMBER_MANAGER_ADDRESSES } from "constants/variables";
import { useAutoCallback } from "hooks.macro";
import useSWR from "swr";
import handleTxError from "util/handleTxError";
import parseRes from "util/parseRes";
import useToast, { FLAVORS } from "./useToast";
import useUnionContract from "./useUnionContract";

const getUnionAllowance = (contract) => async (_, account, chainId) => {
  const res = await contract.allowance(
    account,
    MEMBER_MANAGER_ADDRESSES[chainId]
  );

  const allowance = parseRes(res);

  return allowance;
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
      dedupingInterval: 15 * 1000,
      refreshInterval: 30 * 1000,
    }
  );
}

export function useIncreaseUnionAllowance() {
  const { library, chainId } = useWeb3React();

  const addToast = useToast();

  const contract = useUnionContract();

  const increase = useAutoCallback(async (amount) => {
    let hidePendingToast = () => {};

    const { hide: hideWaiting } = addToast(FLAVORS.TX_WAITING);

    try {
      const tx = await contract.approve(
        MEMBER_MANAGER_ADDRESSES[chainId],
        parseUnits(amount, 18).toString()
      );

      hideWaiting();

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING_TOKEN(tx.hash, chainId)
      );

      hidePendingToast = hidePending();

      const receipt = await library.waitForTransaction(tx.hash);

      if (receipt.status === 1) {
        hidePending();

        addToast(FLAVORS.TX_SUCCESS_ENABLED(tx.hash, chainId));

        return;
      }

      hidePending();

      throw new Error(receipt.logs[0]);
    } catch (err) {
      hideWaiting();

      hidePendingToast();

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message));
    }
  });

  return increase;
}
