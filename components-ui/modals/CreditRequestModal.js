import {
  ModalOverlay,
  Box,
  Modal,
  Label,
  Button,
  ButtonRow,
  Text,
} from "union-ui";
import { useModal } from "hooks/useModal";
import dynamic from "next/dynamic";

export const CREDIT_REQUEST_MODAL = "credit-request-modal";

export const useCreditRequestModal = () => useModal(CREDIT_REQUEST_MODAL);

const QRCode = dynamic(() => import("../ShareQrCode"));

export function CreditRequestModal() {
  const { close } = useCreditRequestModal();
  const url = "https://union.finance/..=0x3535fae254978224";

  return (
    <ModalOverlay>
      <Modal title="Credit Request" onClose={close}>
        <Modal.Body>
          <Box direction="vertical" align="center">
            <Box mt="44px" mb="24px">
              <QRCode link={url} />
            </Box>
            <Text size="large" align="center" mb="12px">
              Share your credit request link
            </Text>
            <Label>{url}</Label>
          </Box>
          <ButtonRow justify="center" mt="12px" fullWidth mb="20px">
            <Button rounded variant="secondary" label="Copy link" icon="link" />
            <Button rounded label="Twitter" icon="twitter" />
            <Button rounded label="Telegram" icon="telegram" />
          </ButtonRow>
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
