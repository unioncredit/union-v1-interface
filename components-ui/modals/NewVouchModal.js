import {
  ModalOverlay,
  Modal,
  Text,
  Input,
  Button,
  Divider,
  ButtonRow,
  Heading,
  Box,
  Badge,
} from "union-ui";
import { useModal } from "hooks/useModal";
import { AddressLabel } from "components-ui";
import { useVouchModal } from "components-ui/modals";
import format from "util/formatValue";
import useIsMember from "hooks/data/useIsMember";
import useBorrowData from "hooks/data/useBorrowData";
import useCreditLimit from "hooks/data/useCreditLimit";

export const NEW_VOUCH_MODAL = "new-vouch-modal";

export const useNewVouchModal = () => useModal(NEW_VOUCH_MODAL);

export function NewVouchModal({ address }) {
  const { close } = useNewVouchModal();
  const { open: openVouchModal } = useVouchModal();
  const { data: isMember } = useIsMember(address);
  const { data: borrowData } = useBorrowData(address);
  const { data: creditLimit = 0 } = useCreditLimit(address);

  const handleBack = () => {
    close();
    openVouchModal();
  };

  const { borrowedRounded = 0 } = !!borrowData && borrowData;

  return (
    <ModalOverlay>
      <Modal title="New vouch" onClose={close} drawer>
        <Modal.Body>
          <Box mb="24px" justify="space-between">
            <AddressLabel address={address} />
            {isMember ? (
              <Badge label="Trusted contact" color="green" />
            ) : (
              <Badge label="Not yet a member" color="blue" />
            )}
          </Box>
          <Box>
            <Box direction="vertical">
              <Text>Credit limit</Text>
              <Heading>DAI {format(creditLimit)}</Heading>
            </Box>
            <Box direction="vertical" ml="32px">
              <Text>Unpaid Debt</Text>
              <Heading>DAI {format(borrowedRounded)}</Heading>
            </Box>
          </Box>
          <Divider />
          <Heading mt="28px" mb="4px">
            Set contacts trust
          </Heading>
          <Text size="large" mb="16px">
            What’s the total value of credit you’d like to make available for
            this contact?
          </Text>
          <Input name="amount" label="Value" placeholder="0" />
        </Modal.Body>
        <Modal.Footer>
          <ButtonRow mt="16px" fluid>
            <Button
              fluid
              label="Go back"
              variant="secondary"
              onClick={handleBack}
            />
            <Button fluid label="Submit vouch" />
          </ButtonRow>
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
