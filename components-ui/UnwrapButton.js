import { useState } from "react";
import { Button } from "@unioncredit/ui";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import { addToast, FLAVORS } from "hooks/useToast";
import { useAddActivity } from "hooks/data/useActivity";
import useUnwrapUnion from "hooks/payables/useUnwrapUnion";
import useUnionSymbol from "hooks/useUnionSymbol";
import format from "util/formatValue";
import { TOKENS } from "constants/variables";
import isHash from "util/isHash";
import getReceipt from "util/getReceipt";
import useTokenBalance from "hooks/data/useTokenBalance";

export const UnwrapButton = ({ onComplete, ...props }) => {
  const unwrap = useUnwrapUnion();
  const addActivity = useAddActivity();
  const { library, chainId } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const { data: unionSymbol } = useUnionSymbol();
  const { data: balance } = useTokenBalance(TOKENS[chainId]?.WRAPPED_UNION);

  const displayBalance = format(formatEther(balance), 4);

  const handleUnwrap = async () => {
    if (balance?.lte("0")) {
      addToast(FLAVORS.ERROR("No tokens to unwrap"));
      return;
    }

    try {
      setLoading(true);
      const { hash } = await unwrap(balance);
      await getReceipt(hash, library, {
        pending: `Unwrapping ${displayBalance} ${unionSymbol}`,
        success: `Unwrapped ${displayBalance} ${unionSymbol}`,
      });
      addActivity(activityLabels.unwrap({ balance, hash }));
      setLoading(false);
      if (typeof onComplete === "function") {
        await onComplete();
      }
    } catch (err) {
      setLoading(false);
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.unwrap({ balance, hash }, true));
      handleTxError(err, `Failed to unwrap ${unionSymbol}`);
    }
  };

  return <Button {...props} onClick={handleUnwrap} loading={loading} />;
};
