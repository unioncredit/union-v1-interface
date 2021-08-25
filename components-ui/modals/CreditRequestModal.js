import { ModalOverlay, Box, Label, Button, ButtonRow, Text } from "union-ui";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import useCopy from "hooks/useCopy";
import dynamic from "next/dynamic";
import generateLink from "util/generateLink";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";

export const CREDIT_REQUEST_MODAL = "credit-request-modal";

export const useCreditRequestModal = () => useModal(CREDIT_REQUEST_MODAL);

const QRCode = dynamic(() => import("../ShareQrCode"));

const SHARE_MESSAGE = `Please vouch for me on Union!`;

const generateTwitterLink = (shareLink) =>
  `https://twitter.com/intent/tweet?text=${SHARE_MESSAGE}&url=${encodeURIComponent(
    shareLink
  )}&via=unionprotocol`;

const generateTelegramLink = (shareLink) =>
  `https://telegram.me/share/url?text=${SHARE_MESSAGE}&url=${encodeURIComponent(
    shareLink
  )}`;

export function CreditRequestModal() {
  const { account } = useWeb3React();
  const [isCopied, copy] = useCopy(2000);
  const { close } = useCreditRequestModal();

  const url = generateLink(account);

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
            <Label title={url}>
              {url.slice(0, 20)}..{url.slice(-20)}
            </Label>
          </Box>
          <ButtonRow justify="center" mt="12px" fullWidth mb="20px">
            <Button
              onClick={() => copy(url)}
              rounded
              variant="secondary"
              label={isCopied ? "Copied" : "Copy link"}
              icon={isCopied ? "check" : "link"}
            />
            <Link href={generateTwitterLink(url)}>
              <Button rounded label="Twitter" icon="twitter" />
            </Link>
            <Link href={generateTelegramLink(url)}>
              <Button rounded label="Telegram" icon="telegram" />
            </Link>
          </ButtonRow>
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
