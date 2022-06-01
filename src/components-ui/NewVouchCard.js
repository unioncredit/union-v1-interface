import { Card, Heading, Button, Label } from "@unioncredit/ui";
import { VouchModal, useVouchModal } from "components-ui/modals";

export function NewVouchCard() {
  const { open: openVouchModal, isOpen: isVouchModalOpen } = useVouchModal();

  return (
    <>
      <Card variant="blue" mt="24px">
        <Card.Body>
          <Heading align="center">Vouch for a new contact</Heading>
          <Label as="p" align="center" mb="24px">
            Vouch for a friend or trusted contact by using your staked assets.
            Make sure it’s someone you really trust.
          </Label>
          <Button label="Vouch for someone" fluid onClick={openVouchModal} />
        </Card.Body>
      </Card>
      {isVouchModalOpen && <VouchModal />}
    </>
  );
}
