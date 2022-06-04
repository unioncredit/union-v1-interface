import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { Card, Button, Label } from "@unioncredit/ui";

import {
  APPROVE_UNION_REGISTER_SIGNATURE_KEY,
  PermitType,
} from "constants/app";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useToken from "hooks/useToken";
import useIsMember from "hooks/data/useIsMember";
import useUnionSymbol from "hooks/useUnionSymbol";
import useMemberFee from "hooks/data/useMemberFee";
import useTokenBalance from "hooks/data/useTokenBalance";
import useUserManager from "hooks/contracts/useUserManager";
import useRegisterMember from "hooks/payables/useRegisterMember";
import { Approval } from "components-ui/Approval";
import { useCongratulationsModal } from "components-ui/modals/CongratulationsModal";

export function BecomeMemberCard({ disabled }) {
  const { library } = useWeb3React();
  const [registering, setRegistering] = useState(false);

  const UNION = useToken("UNION");
  const userManager = useUserManager();
  const registerMember = useRegisterMember();

  const { data: memberFee } = useMemberFee();
  const { data: unionSymbol } = useUnionSymbol();
  const { data: isMember = null } = useIsMember();
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { open: openCongratulationsModal } = useCongratulationsModal();

  const handleRegister = async () => {
    setRegistering(true);

    try {
      const { hash } = await registerMember();
      await getReceipt(hash, library);
      openCongratulationsModal();
    } catch (err) {
      handleTxError(err);
    } finally {
      setRegistering(false);
    }
  };

  const displayMemberFee = memberFee ? formatEther(memberFee.toString()) : "0";

  const hasEnoughUnion = unionBalance >= Number(displayMemberFee);

  return (
    <Card size="fluid">
      <Card.Header
        title="Pay membership fee"
        subTitle={`To finalise the membership process, you’ll need to burn ${displayMemberFee} UNION token. This will activate your account and enable access to your starting credit limit.`}
      />
      <Card.Body>
        <Approval
          label={`Approve ${unionSymbol} for Membership`}
          disabled={disabled}
          amount={displayMemberFee || "0"}
          tokenAddress={UNION}
          spender={userManager.address}
          signatureKey={APPROVE_UNION_REGISTER_SIGNATURE_KEY}
          permitType={PermitType.ERC2612}
        >
          <Button
            fluid
            label={`Burn ${displayMemberFee} ${unionSymbol}`}
            disabled={isMember || disabled || !hasEnoughUnion}
            loading={registering}
            onClick={handleRegister}
          />
        </Approval>
        <Label as="p" mt="12px" mb={0} align="center" grey={400}>
          Complete step 1 & 2 before paying membership
        </Label>
      </Card.Body>
    </Card>
  );
}
