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

export const NEW_VOUCH_MODAL = "new-vouch-modal";

export const useNewVouchModal = () => useModal(NEW_VOUCH_MODAL);

export function NewVouchModal({ address }) {
  const { close } = useNewVouchModal();
  const { open: openVouchModal } = useVouchModal();

  const handleBack = () => {
    close();
    openVouchModal();
  };

  const vouched = 0;
  const used = 0;

  return (
    <ModalOverlay>
      <Modal title="New vouch" onClose={close}>
        <Box mb="24px" justify="space-between">
          <AddressLabel address={address} />
          <Badge label="Trusted contact" color="green" />
        </Box>
        <Box>
          <Box direction="vertical">
            <Text>Credit limit</Text>
            <Heading>DAI {format(vouched)}</Heading>
          </Box>
          <Box direction="vertical" ml="32px">
            <Text>Unpaid Debt</Text>
            <Heading>DAI {format(used)}</Heading>
          </Box>
        </Box>
        <Divider />
        <Heading mt="28px" mb="4px">
          Set contacts trust
        </Heading>
        <Text size="large" mb="16px">
          What’s the total value of credit you’d like to make available for this
          contact?
        </Text>
        <Input name="amount" label="Value" placeholder="0" />
        <Divider />
        <ButtonRow mt="16px">
          <Button
            fluid
            label="Go back"
            variant="secondary"
            onClick={handleBack}
          />
          <Button fluid label="Submit vouch" />
        </ButtonRow>
      </Modal>
    </ModalOverlay>
  );
}
