import { useWeb3React } from "@web3-react/core";
import { ModalOverlay, Box, Label } from "@unioncredit/ui";

import generateLink from "util/generateLink";
import { Modal } from "components-ui";
import { Copyable } from "components-ui/Copyable";
import ShareQrCode from "components-ui/ShareQrCode";
import { useModal, useModalOpen } from "hooks/useModal";

export const CREDIT_REQUEST_MODAL = "credit-request-modal";

export const useCreditRequestModal = () => useModal(CREDIT_REQUEST_MODAL);

export const useCreditRequestModalOpen = () =>
  useModalOpen(CREDIT_REQUEST_MODAL);

export function CreditRequestModal() {
  const { account, chainId } = useWeb3React();
  const { close } = useCreditRequestModal();

  const isOpen = useCreditRequestModalOpen();

  if (!isOpen) return null;

  const url = generateLink(account, chainId);

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Vouch QR Code" onClose={close}>
        <Box direction="vertical" align="center">
          <Box mb="16px">
            <ShareQrCode link={url} />
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
