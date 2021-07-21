import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import useWithdrawRewards from "hooks/payables/useWithdrawRewards";
import { useState } from "react";
import Spinner from "svgs/Spinner";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import classNames from "classnames";

/**
 *
 * @param {object} props
 * @param {("Pill"|"Underline")} props.style
 * @param {Function<Void>} props.onComplete
 */
const WithdrawRewards = ({ style = "Pill", onComplete }) => {
  const { library } = useWeb3React();

  const [withdrawing, setWithdrawing] = useState(false);

  const withdrawRewards = useWithdrawRewards();

  const onWithdrawRewards = useAutoCallback(async () => {
    setWithdrawing(true);

    try {
      const { hash } = await withdrawRewards();

      await getReceipt(hash, library);

      setWithdrawing(false);

      if (typeof onComplete === "function") await onComplete();
    } catch (err) {
      setWithdrawing(false);

      handleTxError(err);
    }
  });

  const cachedClassNames = classNames(
    "text-sm font-semibold focus:outline-none focus:shadow-outline",
    {
      "leading-tight py-1 px-2 rounded-full bg-true-black bg-opacity-10":
        style === "Pill",
      "underline rounded": style === "Underline",
    }
  );

  if (withdrawing) return <Spinner track="#032437" fill="#C5CED5" size={22} />;

  return (
    <button
      className={cachedClassNames}
      disabled={withdrawing}
      onClick={onWithdrawRewards}
    >
      Claim
    </button>
  );
};

export default WithdrawRewards;
