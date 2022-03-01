import { ModalOverlay, Button, Box, Text, Heading } from "union-ui";
import NewMember from "union-ui/lib/icons/newMember.svg";
import Twitter from "union-ui/lib/icons/twitter.svg";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import format from "util/formatValue";

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

  const shareMessage = `Thanks to my friends who backed me for a $${formattedCreditLimit} credit line via @unionprotocol`;

  const handleClose = () => {
    close();
    typeof onClose === "function" && onClose();
  };

  return (
    <ModalOverlay onClick={close}>
      <Modal onClose={handleClose}>
        <Box fluid mb="16px" justify="center">
          <NewMember width="48px" />
        </Box>
        <Heading align="center">
          Congratulations! <br />
          You’re now a member of Union, <br />
          with a starting credit line of {formattedCreditLimit} DAI
        </Heading>
        <Text align="center" mb="24px">
          Start by borrowing from your credit line in the Union Dashboard or go
          ahead and get your friends onboarded by vouching for them.
        </Text>
        <Box align="center" justify="center">
          <Box
            as="a"
            href={generateTwitterLink(shareMessage)}
            target="_blank"
            fluid
          >
            <Button label="Share on Twitter" icon={Twitter} fluid />
          </Box>
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
