import {
  ModalOverlay,
  Box,
  Text,
  Heading,
  Divider,
  Input,
  Button,
} from "union-ui";
import { Modal, Dai } from "components-ui";
import { useModal } from "hooks/useModal";
import format from "util/formatValue";
import { roundDown } from "util/numbers";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import useMaxBorrow from "hooks/data/useMaxBorrow";
import useLoanableAmount from "hooks/data/useLoanableAmount";
import useBorrow from "hooks/payables/useBorrow";
import handleTxError from "util/handleTxError";
import getReceipt from "util/getReceipt";
import { useWeb3React } from "@web3-react/core";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import isHash from "util/isHash";

export const BORROW_MODAL = "borrow-modal";

export const useBorrowModal = () => useModal(BORROW_MODAL);

export function BorrowModal({
  balanceOwed,
  fee,
  creditLimit,
  paymentDueDate,
  paymentPeriod,
  isOverdue,
  onComplete,
}) {
  const addActivity = useAddActivity();
  const { library } = useWeb3React();
  const borrow = useBorrow();
  const { close } = useBorrowModal();
  const { data: maxBorrow } = useMaxBorrow();
  const { data: loanableAmount } = useLoanableAmount();

  const { errors, formState, register, watch, handleSubmit } = useForm({
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
    if (isNaN(val)) return errorMessages.notANumber;
    if (Number(val) > calcMaxIncludingFee) return errorMessages.notEnoughCredit;
    if (Number(val) > maxBorrow) return errorMessages.maxBorrow(maxBorrow);
    if (Number(val) > loanableAmount) return errorMessages.notEnoughPoolDAI;
    if (Number(val) < 1.0) return errorMessages.minDAIBorrow;

    return true;
  };

  const handleBorrow = async (data) => {
    try {
      const { amount } = data;
      const { hash } = await borrow(amount);
      await getReceipt(hash, library);
      if (typeof onComplete === "function") onComplete();
      addActivity(activityLabels.borrow({ amount, hash }));
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.borrow({ amount: data.amount, hash }, true));
      handleTxError(err);
    }
  };

  return (
    <ModalOverlay>
      <Modal title="Borrow funds" onClose={close} drawer>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleBorrow)}>
            <Box mb="16px">
              <Box direction="vertical">
                <Text>Available credit</Text>
                <Heading>
                  <Dai value={format(roundDown(creditLimit))} />
                </Heading>
              </Box>
              <Box direction="vertical" ml="30px">
                <Text>Balance owed</Text>
                <Heading>
                  <Dai value={balanceOwed} />
                </Heading>
              </Box>
            </Box>
            <Divider />
            <Heading mt="36px">Amount to borrow</Heading>
            <Text size="large">How much are you borrowing today?</Text>
            <Box mt="16px">
              <Input
                type="number"
                ref={register({ validate })}
                name="amount"
                label="Borrow"
                placeholder="$0"
                suffix="DAI"
                caption={
                  <>
                    <Dai value={amountWithFee} /> including fee
                  </>
                }
                error={errors.amount?.message || false}
              />
            </Box>
            <Box mt="42px">
              <Box direction="vertical">
                <Text>New balance owed</Text>
                <Heading>
                  <Dai value={newBalanceOwed} />
                </Heading>
              </Box>
              <Box direction="vertical" ml="30px">
                <Text>Repayment due</Text>
                <Heading>{nextPaymentDue}</Heading>
              </Box>
            </Box>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Confirm Borrow"
            fluid
            disabled={!isDirty || isSubmitting}
            onClick={handleSubmit(handleBorrow)}
            fontSize="large"
          />
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
