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
import { useForm } from "react-hook-form";
import { useModal } from "hooks/useModal";
import format from "util/formatValue";
import { roundDown, roundUp } from "util/numbers";
import errorMessages from "util/errorMessages";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";

export const PAYMENT_MODAL = "payment-modal";

export const usePaymentModal = () => useModal(PAYMENT_MODAL);

export function PaymentModal({ paymentDueDate, balanceOwed, interest }) {
  const { close } = usePaymentModal();
  const curToken = useCurrentToken();

  const { errors, formState, register, watch, setValue } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { data: daiBalance = 0.0, mutate: updateDaiBalance } =
    useTokenBalance(curToken);
  const flooredDaiBalance = roundDown(daiBalance);

  const { isDirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const calculateBalanceOwed = balanceOwed > 0 ? balanceOwed : 0;

  const calculateNewBalance = calculateBalanceOwed - amount;

  const formatNewBalance = calculateNewBalance.toFixed(2);

  const nextPaymentDue =
    paymentDueDate === "No Payment Due" ? "-" : paymentDueDate;

  const handlePayMinimum = () => {
    setValue("amount", roundUp(interest));
  };

  const validate = async (val) => {
    if (!val) return errorMessages.required;
    if (Number(val) > flooredDaiBalance)
      return errorMessages.notEnoughBalanceDAI;
    if (Number(val) < 0.01) return errorMessages.minValuePointZeroOne;

    return true;
  };

  return (
    <ModalOverlay>
      <Modal title="Make a payment" onClose={close} drawer>
        <Modal.Body>
          <Box>
            <Box direction="vertical">
              <Text>Balance owed</Text>
              <Heading>DAI {calculateBalanceOwed}</Heading>
            </Box>
            <Box direction="vertical" ml="30px">
              <Text>Min. due</Text>
              <Heading>DAI {roundUp(interest)}</Heading>
            </Box>
            <Box direction="vertical" ml="30px">
              <Text>Default in</Text>
              <Heading>{nextPaymentDue}</Heading>
            </Box>
          </Box>
          <Divider />
          <Heading mt="20px">Amount to repay</Heading>
          <Text size="large">How much are you paying today?</Text>
          <Box mt="16px">
            <Input
              ref={register({ validate })}
              name="amount"
              suffix="DAI"
              label="Repay"
              placeholder="$0"
              caption={`Pay minimum (${roundUp(interest)} DAI)`}
              onCaptionClick={handlePayMinimum}
              error={errors.amount?.message || false}
            />
          </Box>
          <Box mt="24px">
            <Box direction="vertical">
              <Text>New balance owed</Text>
              <Heading>DAI {formatNewBalance}</Heading>
            </Box>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <ButtonRow fluid>
            <Button label="Allow repayment" fluid mt="16px" />
            <Button label="Make payment" fluid mt="16px" />
          </ButtonRow>
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
