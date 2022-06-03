import {
  ModalOverlay,
  Box,
  Input,
  Grid,
  Stat,
  Button,
  Label,
} from "@unioncredit/ui";
import { Modal, Dai } from "components-ui";
import { useModal } from "hooks/useModal";
import format from "util/formatValue";
import { roundDown, toFixed } from "util/numbers";
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
import useMinBorrow from "hooks/data/useMinBorrow";
import { formatUnits, parseEther } from "@ethersproject/units";
import { ZERO, WAD } from "constants/variables";
import { BigNumber } from "@ethersproject/bignumber";

export const BORROW_MODAL = "borrow-modal";

export const useBorrowModal = () => useModal(BORROW_MODAL);

export function BorrowModal({ borrowData, creditLimit, onComplete }) {
  const borrow = useBorrow();
  const addActivity = useAddActivity();

  const { library } = useWeb3React();
  const { close } = useBorrowModal();

  const { data: maxBorrow = ZERO } = useMaxBorrow();
  const { data: loanableAmount = ZERO } = useLoanableAmount();
  const { data: minBorrow = ZERO } = useMinBorrow();

  const {
    borrowed = ZERO,
    paymentDueDate = "-",
    paymentPeriod = "-",
    fee = ZERO,
    isOverdue = false,
  } = !!borrowData && borrowData;

  const { formState, register, watch, handleSubmit, setValue } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { errors, isDirty, isSubmitting } = formState;

  const watchAmount = String(watch("amount") || 0);
  const amount = BigNumber.from(parseEther(watchAmount));

  const maxFeeAmount = creditLimit.mul(fee).div(WAD);
  const maxBorrowAmount = creditLimit.sub(maxFeeAmount);
  const borrowedAmount = borrowed > ZERO ? borrowed : ZERO;
  const feeAmount = amount.mul(fee).div(WAD);
  const totalBorrow = feeAmount.add(amount);
  const newBalanceOwed = borrowedAmount.add(totalBorrow);

  const creditLimitView = format(formatUnits(creditLimit, 18), 2);
  const borrowedView = format(formatUnits(borrowed, 18), 2);
  const totalBorrowView = format(formatUnits(totalBorrow, 18), 2);
  const newBalanceOwedView = format(formatUnits(newBalanceOwed, 18), 2);
  const amountView = format(formatUnits(amount, 18), 2);
  const maxBorrowView = format(formatUnits(maxBorrow, 18), 2);
  const minBorrowView = format(formatUnits(minBorrow, 18), 2);
  const maxBorrowAmountView = format(
    roundDown(formatUnits(maxBorrowAmount, 18)),
    2
  );

  const nextPaymentDue =
    paymentDueDate !== "-" &&
    paymentDueDate !== "No Payment Due" &&
    borrowedAmount > 0
      ? paymentDueDate
      : paymentPeriod;

  const validate = async (val) => {
    if (!val) return errorMessages.required;
    if (isOverdue) return errorMessages.overdueBalance;
    if (isNaN(val)) return errorMessages.notANumber;

    const scaled = String(toFixed(val * 10 ** 18));
    const bnValue = BigNumber.from(scaled);
    if (bnValue.gt(maxBorrowAmount)) return errorMessages.notEnoughCredit;
    if (bnValue.gt(maxBorrow)) return errorMessages.maxBorrow(maxBorrowView);
    if (bnValue.gt(loanableAmount)) return errorMessages.notEnoughPoolDAI;
    if (bnValue.lt(minBorrow)) return errorMessages.minDAIBorrow(minBorrowView);

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

  const setMaxBorrow = () =>
    setValue("amount", roundDown(formatUnits(maxBorrowAmount, 18)), {
      shouldValidate: true,
      shouldDirty: true,
    });

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
                  value={<Dai value={creditLimitView} />}
                />
              </Grid.Col>
              <Grid.Col>
                <Stat
                  size="medium"
                  align="center"
                  label="You owe"
                  value={<Dai value={borrowedView} />}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
          <Box mt="24px">
            <Input
              type="number"
              {...register("amount", { validate })}
              name="amount"
              label="Borrow"
              placeholder="0.0"
              suffix={<Dai />}
              caption={`Max. ${maxBorrowAmountView} DAI`}
              onCaptionClick={setMaxBorrow}
              error={errors.amount?.message || false}
            />
          </Box>
          <Box justify="space-between" mt="16px">
            <Label as="p" size="small" grey={400}>
              Total including fee
            </Label>
            <Label as="p" size="small" grey={400}>
              {totalBorrowView} DAI
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
              {newBalanceOwedView} DAI
            </Label>
          </Box>
          <Button
            fluid
            mt="18px"
            label={`Borrow ${amountView} DAI`}
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
