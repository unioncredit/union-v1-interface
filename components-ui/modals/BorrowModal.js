import {
  ModalOverlay,
  Modal,
  Box,
  Text,
  Heading,
  Divider,
  Input,
  Button,
} from "union-ui";
import { useModal } from "hooks/useModal";

export const BORROW_MODAL = "borrow-modal";

export const useBorrowModal = () => useModal(BORROW_MODAL);

export function BorrowModal() {
  const { close } = useBorrowModal();
  return (
    <ModalOverlay>
      <Modal title="Borrow funds" onClose={close}>
        <Box>
          <Box direction="vertical">
            <Text>Available credit</Text>
            <Heading>DAI 1200</Heading>
          </Box>
          <Box direction="vertical" ml="30px">
            <Text>Balance owed</Text>
            <Heading>DAI 100</Heading>
          </Box>
        </Box>
        <Divider />
        <Heading mt="20px">Amount to borrow</Heading>
        <Text size="large">How much are you borrowing today?</Text>
        <Box mt="16px">
          <Input
            label="borrow"
            placeholder="$0"
            suffix="DAI"
            caption="505.22 DAI including fee"
          />
        </Box>
        <Box mt="24px">
          <Box direction="vertical">
            <Text>New balance owed</Text>
            <Heading>DAI 1200</Heading>
          </Box>
          <Box direction="vertical" ml="30px">
            <Text>Repayment due</Text>
            <Heading>~30 days</Heading>
          </Box>
        </Box>
        <Divider />
        <Button label="Confirm Borrow" fluid mt="16px" />
      </Modal>
    </ModalOverlay>
  );
}

