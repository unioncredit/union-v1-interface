import { useState } from "react";
import { Button } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import useWithdrawRewards from "hooks/payables/useWithdrawRewards";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";

export function ClaimButton({ onComplete, label, ...props }) {
  const { library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const withdrawRewards = useWithdrawRewards();

  const handleClaim = async () => {
    try {
      setLoading(true);
      const { hash } = await withdrawRewards();
      await getReceipt(hash, library);
      setLoading(false);
      if (typeof onComplete === "function") {
        await onComplete();
      }
    } catch (err) {
      setLoading(false);
      handleTxError(err);
    }
  };

  return (
    <Button {...props} label={label} onClick={handleClaim} loading={loading} />
  );
}
