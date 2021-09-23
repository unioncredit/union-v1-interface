import { ModalOverlay, Box, Label } from "union-ui";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import dynamic from "next/dynamic";
import generateLink from "util/generateLink";
import { useWeb3React } from "@web3-react/core";
import { Copyable } from "components-ui/Copyable";

export const CREDIT_REQUEST_MODAL = "credit-request-modal";

export const useCreditRequestModal = () => useModal(CREDIT_REQUEST_MODAL);

const QRCode = dynamic(() => import("../ShareQrCode"));

export function CreditRequestModal() {
  const { account } = useWeb3React();
  const { close } = useCreditRequestModal();

  const url = generateLink(account);

  return (
    <ModalOverlay>
      <Modal title="Vouch QR Code" onClose={close}>
        <Box direction="vertical" align="center">
          <Box mb="16px">
            <QRCode link={url} />
          </Box>
          <Copyable value={url}>
            <Label as="p" title={url} mb="6px">
              {url.slice(0, 20)}..{url.slice(-20)}
            </Label>
          </Copyable>
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
