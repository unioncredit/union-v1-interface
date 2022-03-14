import { ModalOverlay, Box, Input, Grid, Stat, Button, Label } from "union-ui";
import { Modal, Dai } from "components-ui";
import { useModal } from "hooks/useModal";
import format from "util/formatValue";
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
import useMinBorrow from "hooks/stats/marketSettingsStats/useMinBorrow";
import { commify, formatUnits, parseUnits } from "@ethersproject/units";
import { WAD, ZERO } from "constants/app";

export const BORROW_MODAL = "borrow-modal";

export const useBorrowModal = () => useModal(BORROW_MODAL);

export function BorrowModal({
  borrowed = ZERO,
  fee = ZERO,
  creditLimit = ZERO,
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
  const { data: minBorrow } = useMinBorrow();

  const { errors, formState, register, watch, handleSubmit, setValue } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
    });

  const { isDirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = parseUnits((watchAmount || 0).toString(), 18);

  const calculateFee = amount.mul(fee).div(WAD);

  const maxUserBorrow = creditLimit.sub(calculateFee);

  const amountWithFee = amount.add(calculateFee);
  const calcNewBalanceOwed = borrowed.add(amountWithFee);
  const newBalanceOwed = calcNewBalanceOwed.toString();

  const nextPaymentDue =
    paymentDueDate !== "-" &&
    paymentDueDate !== "No Payment Due" &&
    borrowed.gt(ZERO)
      ? paymentDueDate
      : paymentPeriod;

  const validate = async (val) => {
    if (!val) return errorMessages.required;
    if (isOverdue) return errorMessages.overdueBalance;
    if (isNaN(val)) return errorMessages.notANumber;

    val = parseUnits(val, 18);

    if (val.gt(maxUserBorrow)) return errorMessages.notEnoughCredit;
    if (val.gt(maxBorrow)) return errorMessages.maxBorrow(maxBorrow);
    if (val.gt(loanableAmount)) return errorMessages.notEnoughPoolDAI;
    if (val.lt(minBorrow)) return errorMessages.minDAIBorrow(minBorrow);

    return true;
  };

  const handleBorrow = async (data) => {
    try {
      const { amount } = data;
      const { hash } = await borrow(amount);
      await getReceipt(hash, library, {
        pending: `Borrowing ${amount} DAI`,
        success: `Borrowed ${amount} DAI`,
      });
      if (typeof onComplete === "function") onComplete();
      addActivity(activityLabels.borrow({ amount, hash }));
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.borrow({ amount: data.amount, hash }, true));
      handleTxError(err, `Failed to borrow ${amount} DAI`);
    }
  };

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Borrow funds" onClose={close}>
        <form onSubmit={handleSubmit(handleBorrow)}>
          <Grid>
            <Grid.Row>
              <Grid.Col>
                <Stat
                  size="medium"
                  align="center"
                  label="Available credit"
                  value={
                    <Dai value={format(formatUnits(creditLimit, 18), 2)} />
                  }
                />
              </Grid.Col>
              <Grid.Col>
                <Stat
                  size="medium"
                  align="center"
                  label="You owe"
                  value={<Dai value={format(formatUnits(borrowed, 18))} />}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
          <Box mt="24px">
            <Input
              type="number"
              ref={register({ validate })}
              name="amount"
              label="Borrow"
              placeholder="0.0"
              suffix={<Dai />}
              caption={`Max. ${format(formatUnits(maxUserBorrow, 18))} DAI`}
              onCaptionClick={() =>
                setValue("amount", formatUnits(maxUserBorrow, 18), {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors.amount?.message || false}
            />
          </Box>
          <Box justify="space-between" mt="16px">
            <Label as="p" size="small" grey={400}>
              Total including fee
            </Label>
            <Label as="p" size="small" grey={400}>
              {format(formatUnits(amountWithFee, 18), 2)} DAI
            </Label>
          </Box>
          <Box justify="space-between">
            <Label as="p" size="small" grey={400}>
              First Payment Due
            </Label>
            <Label as="p" size="small" grey={400}>
              {nextPaymentDue}
            </Label>
          </Box>
          <Box justify="space-between">
            <Label as="p" size="small" grey={400}>
              New balance owed
            </Label>
            <Label as="p" size="small" grey={400}>
              {format(formatUnits(newBalanceOwed, 18), 2)} DAI
            </Label>
          </Box>
          <Button
            fluid
            mt="18px"
            label={`Borrow ${commify(formatUnits(amount, 18))} DAI`}
            disabled={!isDirty}
            loading={isSubmitting}
            onClick={handleSubmit(handleBorrow)}
            fontSize="large"
          />
        </form>
      </Modal>
    </ModalOverlay>
  );
}
