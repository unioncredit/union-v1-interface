import {
  ModalOverlay,
  Modal,
  Box,
  Text,
  Heading,
  Divider,
  Input,
  Button,
  ButtonRow,
} from "union-ui";
import { useModal } from "hooks/useModal";

export const PAYMENT_MODAL = "payment-modal";

export const usePaymentModal = () => useModal(PAYMENT_MODAL);

export function PaymentModal() {
  const { close } = usePaymentModal();
  return (
    <ModalOverlay>
      <Modal title="Make a payment" onClose={close}>
        <Box>
          <Box direction="vertical">
            <Text>Balance owed</Text>
            <Heading>DAI 1200</Heading>
          </Box>
          <Box direction="vertical" ml="30px">
            <Text>Min. due</Text>
            <Heading>DAI 100.98</Heading>
          </Box>
          <Box direction="vertical" ml="30px">
            <Text>Default in</Text>
            <Heading>12 days</Heading>
          </Box>
        </Box>
        <Divider />
        <Heading mt="20px">Amount to repay</Heading>
        <Text size="large">How much are you paying today?</Text>
        <Box mt="16px">
          <Input
            label="Repay"
            placeholder="$0"
            suffix="DAI"
            caption="Pay minimum (21.98 DAI)"
            onCaptionClick={() => alert()}
          />
        </Box>
        <Box mt="24px">
          <Box direction="vertical">
            <Text>New balance owed</Text>
            <Heading>DAI 1200</Heading>
          </Box>
        </Box>
        <Divider />
        <ButtonRow>
          <Button label="Allow repayment" fluid mt="16px" />
          <Button label="Make payment" fluid mt="16px" />
        </ButtonRow>
      </Modal>
    </ModalOverlay>
  );
}

