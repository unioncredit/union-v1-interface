import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import useUnionContract from "hooks/useUnionContract";
import { useState } from "react";
import handleTxError from "util/handleTxError";

const WithdrawRewards = ({ onComplete }) => {
  const { account } = useWeb3React();
  const curToken = useCurrentToken();

  const [withdrawing, setWithdrawing] = useState(false);

  const unionContract = useUnionContract();

  const addToast = useToast();

  const onWithdrawRewards = useAutoCallback(async () => {
    setWithdrawing(true);

    const { hide: hideWaiting } = addToast(FLAVORS.TX_WAITING);

    try {
      const tx = await unionContract.withdrawRewards(account, curToken);

      hideWaiting();

      const { hide: hidePending } = addToast(FLAVORS.TX_PENDING);

      await tx.wait();

      hidePending();

      addToast(FLAVORS.TX_SUCCESS);

      setWithdrawing(false);

      onComplete();
    } catch (err) {
      const message = handleTxError(err);

      hideWaiting();

      addToast(FLAVORS.TX_ERROR(message));

      setWithdrawing(false);
    }
  });

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
