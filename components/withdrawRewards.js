import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import useWithdrawRewards from "hooks/payables/useWithdrawRewards";
import { useState } from "react";
import Spinner from "svgs/Spinner";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";

const WithdrawRewards = ({ onComplete }) => {
  const { library } = useWeb3React();

  const [withdrawing, setWithdrawing] = useState(false);

  const withdrawRewards = useWithdrawRewards();

  const onWithdrawRewards = useAutoCallback(async () => {
    setWithdrawing(true);

    try {
      const { hash } = await withdrawRewards();

      await getReceipt(hash, library);

      setWithdrawing(false);

      await onComplete();
    } catch (err) {
      setWithdrawing(false);

      handleTxError(err);
    }
  });

  if (withdrawing) return <Spinner track="#032437" fill="#C5CED5" size={22} />;

  return (
    <button
      className="text-sm font-semibold underline rounded focus:outline-none focus:shadow-outline"
      disabled={withdrawing}
      onClick={onWithdrawRewards}
    >
      Collect
    </button>
  );
};

export default WithdrawRewards;
