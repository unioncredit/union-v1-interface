import { Card, Text, Heading, Button, Label } from "union-ui";
import { useState } from "react";
import useIsMember from "hooks/data/useIsMember";
import useRegisterMember from "hooks/payables/useRegisterMember";
import handleTxError from "util/handleTxError";
import getReceipt from "util/getReceipt";
import { useWeb3React } from "@web3-react/core";
import { useCongratulationsModal } from "components-ui/modals/ContratulationsModal";

export function BecomeMemberCard() {
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
    <Card variant="blue" mt="24px">
      <Card.Body>
        <Heading mb="4px" align="center">
          Become a Member
        </Heading>
        <Text align="center" mb="24px">
          Once you have 3 active vouches, unlock your Union membership by
          burning 1 UNION token.
        </Text>
        <Button
          fluid
          label="Burn 1 UNION"
          disabled={isMember}
          loading={registering}
          onClick={handleRegister}
        />
        <Label as="p" mt="12px" mb={0} align="center" color="blue400">
          UNION redeemable by accounts staking DAI
        </Label>
      </Card.Body>
    </Card>
  );
}
