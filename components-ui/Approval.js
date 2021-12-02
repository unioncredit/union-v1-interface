import { Button, Box, Label } from "union-ui";

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
  approvalType: initialApprovalType = ApprovalTypes.SIGNATURE,
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
  const [approvalType, setApprovalType] = useState(initialApprovalType);

  const [loading, setLoading] = useState(false);

  const permit = getPermit(signatureKey);

  const handleApproval = (type) => async () => {
    setLoading(true);
    if (type === ApprovalTypes.SIGNATURE) {
      try {
        await approveWithSignature();
      } catch (_) {
        await approve();
      }
    } else if (type === ApprovalTypes.TRANSACTION) {
      await approve();
    }

    await updateAllowance();
    setLoading(false);
  };

  const toggleApprovalType = () => {
    setApprovalType((type) => {
      return type === ApprovalTypes.TRANSACTION
        ? ApprovalTypes.SIGNATURE
        : ApprovalTypes.TRANSACTION;
    });
  };

  if (!permit && allowance?.lt(parseEther(amount.toString()))) {
    return (
      <Box fluid direction="vertical">
        <Button
          fluid
          loading={loading}
          label={approvalText[approvalType]}
          onClick={handleApproval}
        />
        <Label
          as="p"
          style={{ cursor: "pointer" }}
          onClick={toggleApprovalType}
          size="small"
          color="blue500"
          align="center"
          w="100%"
          mt="16px"
        >
          Toggle approval type
        </Label>
      </Box>
    );
  }

  return children;
}
