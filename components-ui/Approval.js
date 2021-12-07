import { Card, Button, Box, Label } from "union-ui";
import Switch from "union-ui/lib/icons/switch.svg";

import useAllowance from "hooks/useAllowance";
import { parseEther } from "@ethersproject/units";
import { useState } from "react";
import usePermits from "hooks/usePermits";
import { PermitType, ApprovalTypes } from "constants/app";

import styles from "./approval.module.css";

const defaultApprovalTypeText = {
  [ApprovalTypes.SIGNATURE]: "Approving with permit",
  [ApprovalTypes.TRANSACTION]: "Approving with transaction",
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
  amount,
  children,
  spender,
  tokenAddress,
  disabled,
  label = "Approve",
  permitType = PermitType.DAI,
  approvalType: initialApprovalType = ApprovalTypes.SIGNATURE,
  approvalTypeText = defaultApprovalTypeText,
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

  const parsedAmount = parseEther(amount.toString());

  const handleApproval = async () => {
    setLoading(true);
    if (approvalType === ApprovalTypes.SIGNATURE) {
      try {
        await approveWithSignature(parsedAmount.toString(), permitType);
      } catch (_) {
        await approve();
      }
    } else if (approvalType === ApprovalTypes.TRANSACTION) {
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

  const typeText = approvalTypeText[approvalType];

  if (!disabled && !permit && allowance?.lt(parsedAmount)) {
    return (
      <Card variant="blue" packed className={styles.card}>
        <Box
          fluid
          mt="4px"
          mb="10px"
          align="center"
          justify="center"
          onClick={toggleApprovalType}
        >
          <div className={styles.switchIcon}>
            <Switch width="24px" />
          </div>
          <Label
            m={0}
            as="p"
            style={{ cursor: "pointer" }}
            size="small"
            color="blue500"
            align="center"
          >
            {typeText}
          </Label>
        </Box>
        <Button
          fluid
          loading={loading}
          label={label}
          onClick={handleApproval}
        />
      </Card>
    );
  }

  return children;
}
