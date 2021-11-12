import { Card, Button, Label } from "union-ui";
import { useState } from "react";
import useIsMember from "hooks/data/useIsMember";
import useRegisterMember from "hooks/payables/useRegisterMember";
import handleTxError from "util/handleTxError";
import getReceipt from "util/getReceipt";
import { useWeb3React } from "@web3-react/core";
import { useCongratulationsModal } from "components-ui/modals/ContratulationsModal";

export function BecomeMemberCard({ disabled }) {
  const { library } = useWeb3React();
  const [registering, setRegistering] = useState(false);
  const { data: isMember = null } = useIsMember();
  const registerMember = useRegisterMember();
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
        subTitle="To finalise the membership process, you’ll need to burn 1 UNION token. This will activate your account and enable access to your starting credit limit."
      />
      <Card.Body>
        <Button
          fluid
          label="Burn 1 UNION"
          disabled={isMember || disabled}
          loading={registering}
          onClick={handleRegister}
        />
        <Label as="p" mt="12px" mb={0} align="center" grey={400}>
          Complete step 1 & 2 before paying membership
        </Label>
      </Card.Body>
    </Card>
  );
}
