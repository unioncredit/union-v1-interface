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
import { parseEther } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import { APPROVE_UNION_REGISTER_SIGNATURE_KEY } from "constants/app";
import useUserContract from "hooks/contracts/useUserContract";
import useUnionSymbol from "hooks/useUnionSymbol";

export function BecomeMemberCard({ disabled }) {
  const [registering, setRegistering] = useState(false);

  const { library } = useWeb3React();
  const userManager = useUserContract();
  const UNION = useCurrentToken("UNION");
  const unionSymbol = useUnionSymbol();
  const registerMember = useRegisterMember();
  const { data: memberFee } = useMemberFee();
  const { data: isMember = null } = useIsMember();
  const { open: openCongratulationsModal } = useCongratulationsModal();

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

  return (
    <Card size="fluid">
      <Card.Header
        title="Pay membership fee"
        subTitle={`To finalise the membership process, you’ll need to burn ${memberFee} UNION token. This will activate your account and enable access to your starting credit limit.`}
      />
      <Card.Body>
        <Approval
          label={`Approve ${unionSymbol} for Membership`}
          disabled={disabled}
          amount={parseEther(memberFee?.toString() || "0")}
          tokenAddress={UNION}
          spender={userManager.address}
          signatureKey={APPROVE_UNION_REGISTER_SIGNATURE_KEY}
        >
          <Button
            fluid
            label={`Burn ${memberFee} UNION`}
            disabled={isMember || disabled}
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
