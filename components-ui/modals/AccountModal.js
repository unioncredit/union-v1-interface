import {
  ModalOverlay,
  Modal,
  Label,
  Heading,
  Box,
  Button,
  Text,
} from "union-ui";
import { useModal } from "hooks/useModal";

export const ACCOUNT_MODAL = "account-modal";

export const useAccountModal = () => useModal(ACCOUNT_MODAL);

export function AccountModal() {
  const { close } = useAccountModal();
  return (
    <ModalOverlay>
      <Modal title="Account" onClose={close}>
        <Box align="center" justify="space-between">
          <Text m={0}>Wallet Connect</Text>
          <Button variant="pill">Disconnect</Button>
        </Box>
        <Heading m={0}>Liamo.eth</Heading>
        <Label size="small">0x00..000</Label>
      </Modal>
    </ModalOverlay>
  );
}

