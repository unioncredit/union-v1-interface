import { ModalOverlay, Button, Box, Text, Heading } from "union-ui";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import format from "util/formatValue";
import { Dai } from "components-ui/Dai";
import Link from "next/link";

export const CONGRATULATIONS_MODAL = "congratulations-modal";

export const useCongratulationsModal = () => useModal(CONGRATULATIONS_MODAL);

const SHARE_LINK = "https://union.finance";

const generateTwitterLink = (shareMessage) =>
  `https://twitter.com/intent/tweet?text=${shareMessage}&url=${encodeURIComponent(
    SHARE_LINK
  )}&via=unionprotocol`;

export function CongratulationsModal({ onClose, creditLimit }) {
  const { close } = useCongratulationsModal();
  const formattedCreditLimit = format(creditLimit);
  const shareMessage = `I just joined the Union with a ${formattedCreditLimit} DAI credit line`;

  const handleClose = () => {
    close();
    typeof onClose === "function" && onClose();
  };

  return (
    <ModalOverlay>
      <Modal title="Union Membership" onClose={handleClose} size="medium">
        <Modal.Body>
          <Heading align="center">
            You just joined the Union with a <Dai value={creditLimit} /> credit
            line
          </Heading>
          <Text align="center">
            You’re starting with a credit line of <Dai value={creditLimit} />.
            Get more vouches from trusted friends to increase your credit limit.
          </Text>
          <Box align="center" justify="center">
            <Link href={generateTwitterLink(shareMessage)} target="_blank">
              <Button label="Tweet to celebrate" icon="twitter" rounded />
            </Link>
          </Box>
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
