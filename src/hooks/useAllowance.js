import useSWR from "swr";
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { MaxUint256 } from "@ethersproject/constants";

import isHash from "util/isHash";
import getReceipt from "util/getReceipt";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import truncateAddress from "util/truncateAddress";
import handleTxError from "util/handleTxError";
import useChainId from "hooks/useChainId";
import useERC20 from "hooks/contracts/useERC20";
import usePermits from "hooks/usePermits";

const getAllowance = (_, contract, account, spender) => {
  return contract.allowance(account, spender);
};

export default function useAllowance(tokenAddress, spender, signatureKey) {
  const chainId = useChainId();
  const addActivity = useAddActivity();
  const contract = useERC20(tokenAddress);
  const { account, library } = useWeb3React();
  const { signPermit } = usePermits();

  const shouldFetch = contract && account && chainId;

  const resp = useSWR(
    shouldFetch ? ["Allowance", contract, account, spender] : null,
    getAllowance
  );

  const approve = async () => {
    try {
      const { hash } = await contract.approve(spender, MaxUint256);
      await getReceipt(hash, library, {
        pending: "Approving",
        success: "Approved",
      });
      addActivity(activityLabels.claim({ hash, token: tokenAddress }));
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.claim({ hash, token: tokenAddress }), true);
      handleTxError(err, "Failed to approve");
    }
  };

  const approveWithSignature = useCallback(async (amount, permitType) => {
    await signPermit(signatureKey, tokenAddress, spender, amount, permitType);
  }, []);

  return { ...resp, approve, approveWithSignature };
}
