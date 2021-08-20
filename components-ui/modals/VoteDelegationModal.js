import { ModalOverlay, Divider, Box, Control, Text, Button } from "union-ui";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";

export const VOTE_DELEGATION_MODAL = "vote-delegation-modal";

export const useVoteDelegationModal = () => useModal(VOTE_DELEGATION_MODAL);

export function VoteDelegationModal() {
  const { close } = useVoteDelegationModal();
  return (
    <ModalOverlay>
      <Modal title="Voting wallet setup" onClose={close}>
        <Modal.Body>
          <Text size="large" mb="14px">
            Voting method
          </Text>
          <Box direction="vertical">
            <Control type="radio" checked label="Vote as self" mb="8px" />
            <Control
              type="radio"
              checked
              label="Delegate votes to another account"
            />
          </Box>
          <Divider />
          <Button label="Submit voting preferences" fluid mt="20px" />
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}

