import { Button } from "union-ui";

import useAllowance from "hooks/useAllowance";
import { parseEther } from "@ethersproject/units";
import { useState } from "react";

const ApprovalTypes = {
  SIGNATURE: "signature",
  TRANSACTION: "transaction",
};

/**
 * returns an approval button is there is not enough allowance
 *
 * @param {string} signatureKey - storage key for this signature data
 * @param {string} approvalType - transaction or signature
 * @param {number} amount - amount to approve for
 * @param {string} spender - address who is the spender
 * @param {string} tokenAddress - address of the approval token
 */
export function Approval({
  signatureKey,
  approvalType = ApprovalTypes.SIGNATURE,
  amount,
  children,
  spender,
  tokenAddress,
}) {
  const {
    approve,
    data: allowance,
    mutate: updateAllowance,
    approveWithSignature,
  } = useAllowance(tokenAddress, spender);
  const [loading, setLoading] = useState(false);

  const handleApproval = async () => {
    setLoading(true);
    if (approvalType === ApprovalTypes.SIGNATURE) {
      try {
        await approveWithSignature(signatureKey);
      } catch (_) {
        await approve();
      }
    } else if (approvalType === ApprovalTypes.TRANSACTION) {
      await approve();
    }

    await updateAllowance();
    setLoading(false);
  };

  if (allowance?.lt(parseEther(amount.toString()))) {
    return (
      <Button
        fluid
        loading={loading}
        label="Approve"
        onClick={handleApproval}
      />
    );
  }

  return children;
}
