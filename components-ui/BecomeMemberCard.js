import { Card, Button, Label } from "union-ui";
import { useState } from "react";
import useIsMember from "hooks/data/useIsMember";
import useRegisterMember from "hooks/payables/useRegisterMember";
import handleTxError from "util/handleTxError";
import getReceipt from "util/getReceipt";
import { useWeb3React } from "@web3-react/core";
import { useCongratulationsModal } from "components-ui/modals/ContratulationsModal";
import { Approval } from "./Approval";
import useMemberFee from "hooks/data/useMemberFee";
import useCurrentToken from "hooks/useCurrentToken";
import {
  APPROVE_UNION_REGISTER_SIGNATURE_KEY,
  PermitType,
} from "constants/app";
import useUserContract from "hooks/contracts/useUserContract";
import useUnionSymbol from "hooks/useUnionSymbol";
import { formatUnits } from "@ethersproject/units";
import useTokenBalance from "hooks/data/useTokenBalance";

export function BecomeMemberCard({ disabled }) {
  const [registering, setRegistering] = useState(false);

  const { library } = useWeb3React();
  const userManager = useUserContract();
  const UNION = useCurrentToken("UNION");
  const { data: unionSymbol } = useUnionSymbol();
  const registerMember = useRegisterMember();
  const { data: memberFee } = useMemberFee();
  const { data: isMember = null } = useIsMember();
  const { open: openCongratulationsModal } = useCongratulationsModal();
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);

  const handleRegister = async () => {
    try {
      setRegistering(true);
      const { hash } = await registerMember();
      await getReceipt(hash, library);
      openCongratulationsModal();
      setRegistering(false);
    } catch (err) {
      setRegistering(false);
      handleTxError(err);
    }
  };

  const displayMemberFee = memberFee
    ? formatUnits(memberFee.toString(), 18)
    : "0";

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
          amount={memberFee || "0"}
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
