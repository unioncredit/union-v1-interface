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
    <ModalOverlay onClick={close}>
      <Modal title="Vouch QR Code" onClose={close}>
        <Box direction="vertical" align="center">
          <Box mb="16px">
            <QRCode link={url} />
          </Box>
          <Box mb="16px">
            <Label as="p" title={url} m={0}>
              <Copyable value={url}>
                {url.slice(0, 16)}..{url.slice(-16)}
              </Copyable>
            </Label>
          </Box>
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
