import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import useUnionContract from "hooks/useUnionContract";
import { useState } from "react";
import handleTxError from "util/handleTxError";
import Spinner from "svgs/Spinner";

const WithdrawRewards = ({ onComplete }) => {
  const { account, chainId, library } = useWeb3React();
  const curToken = useCurrentToken();

  const [withdrawing, setWithdrawing] = useState(false);

  const unionContract = useUnionContract();

  const addToast = useToast();

  const onWithdrawRewards = useAutoCallback(async () => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    setWithdrawing(true);

    const { hide: hideWaiting } = addToast(FLAVORS.TX_WAITING);

    try {
      const tx = await unionContract.withdrawRewards(account, curToken);

      hideWaiting();

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING(tx.hash, chainId)
      );

      hidePendingToast = hidePending;

      const receipt = await library.waitForTransaction(tx.hash);

      if (receipt.status === 1) {
        hidePending();

        addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));

        setWithdrawing(false);

        await onComplete();

        return;
      }

      hidePending();

      txReceipt = receipt;

      throw new Error(receipt.logs[0]);
    } catch (err) {
      setWithdrawing(false);

      hideWaiting();

      hidePendingToast();

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message, txReceipt?.transactionHash, chainId));
    }
  });

  return (
    <button
      className="text-sm font-semibold underline focus:outline-none"
      disabled={withdrawing}
      onClick={onWithdrawRewards}
    >
      {withdrawing ? (
        <Spinner track="#032437" fill="#C5CED5" size={22} />
      ) : (
        "Claim rewards"
      )}
    </button>
  );
};

export default WithdrawRewards;
