import {
  ModalOverlay,
  Modal,
  Box,
  Button,
  Divider,
  Text,
  Label,
  Heading,
} from "union-ui";
import { useModal } from "hooks/useModal";

export const WALLET_MODAL = "wallet-modal";

export const useWalletModal = () => useModal(WALLET_MODAL);

export function WalletModal() {
  const { close } = useWalletModal();
  return (
    <ModalOverlay>
      <Modal title="Wallet" onClose={close}>
        <Box align="center" justify="space-between">
          <Text m={0}>Unclaimed Tokens</Text>
          <Button variant="pill">Claim tokens</Button>
        </Box>
        <Heading m={0}>813 UNION</Heading>
        <Label size="small">12.2 tokens per day</Label>
        <Text mt="16px">Wallet balance</Text>
        <Heading m={0}>16,000 UNION</Heading>
        <Divider />
        <Box align="center" justify="space-between" mt="20px">
          <Text mb={0}>Voting Power</Text>
          <Button variant="pill" onClick={() => alert()}>
            Voting profile
          </Button>
        </Box>
        <Heading m={0}>16,000 votes</Heading>
        <Label size="small">0 delegated to you</Label>
        <Text mt="16px">Delegating to</Text>
        <Heading m={0}>Self</Heading>
      </Modal>
    </ModalOverlay>
  );
}

