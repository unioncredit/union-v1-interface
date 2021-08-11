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
import format from "util/formatValue";
import { roundDown } from "util/numbers";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import useMaxBorrow from "hooks/data/useMaxBorrow";
import useLoanableAmount from "hooks/data/useLoanableAmount";

export const BORROW_MODAL = "borrow-modal";

export const useBorrowModal = () => useModal(BORROW_MODAL);

export function BorrowModal({
  balanceOwed,
  fee,
  creditLimit,
  paymentDueDate,
  paymentPeriod,
  isOverdue,
}) {
  const { close } = useBorrowModal();
  const { data: maxBorrow } = useMaxBorrow();
  const { data: loanableAmount } = useLoanableAmount();

  const { errors, formState, register, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isDirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const calcBalanceOwed = balanceOwed > 0 ? balanceOwed : 0;

  const calcMaxIncludingFee = roundDown(creditLimit * (1 - fee));

  const calculateFee =
    amount === calcMaxIncludingFee
      ? roundDown(creditLimit * fee)
      : amount * fee;

  const amountWithFee = amount + calculateFee;
  const calcNewBalanceOwed = calcBalanceOwed + amountWithFee;
  const newBalanceOwed = calcNewBalanceOwed.toFixed(2);

  const nextPaymentDue =
    paymentDueDate !== "-" &&
    paymentDueDate !== "No Payment Due" &&
    calcBalanceOwed > 0
      ? paymentDueDate
      : paymentPeriod;

  const validate = async (val) => {
    if (!val) return errorMessages.required;
    if (isOverdue) return errorMessages.overdueBalance;
    if (Number(val) > calcMaxIncludingFee) return errorMessages.notEnoughCredit;
    if (Number(val) > maxBorrow) return errorMessages.maxBorrow(maxBorrow);
    if (Number(val) > loanableAmount) return errorMessages.notEnoughPoolDAI;
    if (Number(val) < 1.0) return errorMessages.minDAIBorrow;

    return true;
  };

  return (
    <ModalOverlay>
      <Modal title="Borrow funds" onClose={close}>
        <Box>
          <Box direction="vertical">
            <Text>Available credit</Text>
            <Heading>DAI {format(roundDown(creditLimit))}</Heading>
          </Box>
          <Box direction="vertical" ml="30px">
            <Text>Balance owed</Text>
            <Heading>DAI {balanceOwed}</Heading>
          </Box>
        </Box>
        <Divider />
        <Heading mt="20px">Amount to borrow</Heading>
        <Text size="large">How much are you borrowing today?</Text>
        <Box mt="16px">
          <Input
            ref={register({ validate })}
            name="amount"
            label="borrow"
            placeholder="$0"
            suffix="DAI"
            caption={`${amountWithFee} DAI including fee`}
            error={errors.amount?.message || false}
          />
        </Box>
        <Box mt="24px">
          <Box direction="vertical">
            <Text>New balance owed</Text>
            <Heading>DAI {newBalanceOwed}</Heading>
          </Box>
          <Box direction="vertical" ml="30px">
            <Text>Repayment due</Text>
            <Heading>{nextPaymentDue}</Heading>
          </Box>
        </Box>
        <Divider />
        <Button label="Confirm Borrow" fluid mt="16px" />
      </Modal>
    </ModalOverlay>
  );
}
