import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import useWithdrawRewards from "hooks/payables/useWithdrawRewards";
import useToast, { FLAVORS } from "hooks/useToast";
import { useState } from "react";
// import Spinner from "svgs/Spinner";
import handleTxError from "util/handleTxError";

const WithdrawRewards = ({ onComplete }) => {
  const { library } = useWeb3React();

  const [withdrawing, setWithdrawing] = useState(false);

  const withdrawRewards = useWithdrawRewards();

  const addToast = useToast();

  const onWithdrawRewards = useAutoCallback(async () => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    setWithdrawing(true);

    const { hide: hideWaiting } = addToast(FLAVORS.TX_WAITING);

    try {
      const tx = await withdrawRewards();

      hideWaiting();

      const { hide: hidePending } = addToast(FLAVORS.TX_PENDING(tx.hash));

      hidePendingToast = hidePending;

      const receipt = await library.waitForTransaction(tx.hash);

      if (receipt.status === 1) {
        hidePending();

        addToast(FLAVORS.TX_SUCCESS(tx.hash));

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

      addToast(FLAVORS.TX_ERROR(message, txReceipt?.transactionHash));
    }
  });

  // if (withdrawing) return <Spinner track="#032437" fill="#C5CED5" size={22} />;

  // return (
  //   <button
  //     className="text-sm underline font-semibold focus:outline-none"
  //     onClick={onWithdrawRewards}
  //   >
  //     Collect
  //   </button>
  // );

  return (
    <button
      className="text-sm font-semibold underline focus:outline-none"
      disabled={withdrawing}
      onClick={onWithdrawRewards}
    >
      {withdrawing ? "Withdrawing Rewards..." : "Withdraw Rewards"}
    </button>
  );
};

export default WithdrawRewards;
