import { Button } from "union-ui";

import useAllowance from "hooks/useAllowance";
import { parseEther } from "@ethersproject/units";
import { useState } from "react";
import usePermits from "hooks/usePermits";

const ApprovalTypes = {
  SIGNATURE: "signature",
  TRANSACTION: "transaction",
};

const approvalText = {
  [ApprovalTypes.SIGNATURE]: "Approve with permit",
  [ApprovalTypes.TRANSACTION]: "Approve with transaction",
}

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
  } = useAllowance(tokenAddress, spender, signatureKey);
  const { getPermit } = usePermits();

  const [loading, setLoading] = useState(false);

  const permit = getPermit(signatureKey);

  const handleApproval = async () => {
    setLoading(true);
    if (approvalType === ApprovalTypes.SIGNATURE) {
      try {
        await approveWithSignature();
      } catch (_) {
        await approve();
      }
    } else if (approvalType === ApprovalTypes.TRANSACTION) {
      await approve();
    }

    await updateAllowance();
    setLoading(false);
  };

  if (!permit && allowance?.lt(parseEther(amount.toString()))) {
    return (
      <Button
        fluid
        loading={loading}
        label={approvalText[approvalType]}
        onClick={handleApproval}
      />
    );
  }

  return children;
}
