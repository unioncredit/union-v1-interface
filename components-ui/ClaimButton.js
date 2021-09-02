import { useState } from "react";
import { Button } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import useWithdrawRewards from "hooks/payables/useWithdrawRewards";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import useRewardsData from "hooks/data/useRewardsData";
import isHash from "util/isHash";

export function ClaimButton({ onComplete, label, ...props }) {
  const addActivity = useAddActivity();
  const { library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const withdrawRewards = useWithdrawRewards();
  const { data: rewardsData } = useRewardsData();
  const { rewards = 0.0 } = !!rewardsData && rewardsData;

  const handleClaim = async () => {
    try {
      setLoading(true);
      const { hash } = await withdrawRewards();
      await getReceipt(hash, library);
      addActivity(activityLabels.claim({ amount: rewards, hash }));
      setLoading(false);
      if (typeof onComplete === "function") {
        await onComplete();
      }
    } catch (err) {
      setLoading(false);
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.claim({ amount: rewards, hash }, true));
      handleTxError(err);
    }
  };

  return (
    <Button {...props} label={label} onClick={handleClaim} loading={loading} />
  );
}
