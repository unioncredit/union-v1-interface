import {
  ModalOverlay,
  Box,
  Input,
  Stat,
  Button,
  ButtonRow,
  Grid,
  Label,
} from "union-ui";
import { Modal, Dai } from "components-ui";
import { useForm } from "react-hook-form";
import { useModal } from "hooks/useModal";
import { REPAY_MARGIN } from "constants/variables";
import { roundDown, roundUp } from "util/numbers";
import errorMessages from "util/errorMessages";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import handleTxError from "util/handleTxError";
import getReceipt from "util/getReceipt";
import { useWeb3React } from "@web3-react/core";
import useRepay from "hooks/payables/useRepay";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import isHash from "util/isHash";
import format from "util/formatValue";

export const PAYMENT_MODAL = "payment-modal";

export const usePaymentModal = () => useModal(PAYMENT_MODAL);

export function PaymentModal({
  paymentDueDate,
  balanceOwed,
  interest,
  onComplete,
}) {
  const addActivity = useAddActivity();
  const { library } = useWeb3React();
  const { close } = usePaymentModal();
  const curToken = useCurrentToken();
  const repay = useRepay();

  const { errors, formState, register, watch, setValue, handleSubmit } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
    });

  const { data: daiBalance = 0.0 } = useTokenBalance(curToken);
  const flooredDaiBalance = roundDown(daiBalance);

  const { isDirty, isSubmitting } = formState;

  const watchAmount = watch("amount", 0);
  const amount = Number(watchAmount || 0);

  const calculateBalanceOwed = balanceOwed > 0 ? balanceOwed : 0;

  const calculateMaxValue =
    flooredDaiBalance <= calculateBalanceOwed
      ? flooredDaiBalance
      : calculateBalanceOwed;

  const nextPaymentDue =
    paymentDueDate === "No Payment Due" ? "-" : paymentDueDate;

  const newBalanceOwed = calculateBalanceOwed - amount;

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

  const handlePayment = async (values) => {
    const amountToRepay =
      Number(values.amount) === calculateMaxValue
        ? Number(values.amount * REPAY_MARGIN) > flooredDaiBalance
          ? flooredDaiBalance
          : Number(values.amount * REPAY_MARGIN)
        : Number(values.amount);

    try {
      const { hash } = await repay(amountToRepay);
      await getReceipt(hash, library, {
        pending: `Paying back ${amountToRepay} DAI`,
        success: `Paid back ${amountToRepay} DAI`,
      });
      addActivity(activityLabels.repay({ amount: amountToRepay, hash }));
      if (typeof onComplete === "function") await onComplete();
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.repay({ amount: amountToRepay, hash }, true));
      handleTxError(err, `Failed to pay back ${amountToRepay} DAI`);
    }
  };

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Make a payment" onClose={close}>
        <form onSubmit={handleSubmit(handlePayment)}>
          <Grid>
            <Grid.Row>
              <Grid.Col xs={12}>
                <Stat
                  mb="16px"
                  align="center"
                  size="medium"
                  label="Balance owed"
                  value={<Dai value={calculateBalanceOwed} />}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stat
                  align="center"
                  label="Min due"
                  value={<Dai value={roundUp(interest)} />}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stat
                  align="center"
                  label="Defaults in"
                  value={nextPaymentDue}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
          <Box mt="16px">
            <Input
              type="number"
              ref={register({ validate })}
              name="amount"
              suffix={<Dai />}
              label="Repay"
              placeholder="0.0"
              caption={`Pay minimum ${roundUp(interest)} DAI`}
              onCaptionClick={handlePayMinimum}
              error={errors.amount?.message || false}
            />
          </Box>
          <Box justify="space-between" mt="16px">
            <Label as="p" size="small">
              New balance owed
            </Label>
            <Label as="p" size="small">
              {format(newBalanceOwed)} DAI
            </Label>
          </Box>
          <ButtonRow fluid>
            <Button
              label={`Repay ${amount} DAI`}
              fluid
              mt="16px"
              loading={isSubmitting}
              disabled={!isDirty}
              onClick={handleSubmit(handlePayment)}
              fontSize="large"
            />
          </ButtonRow>
        </form>
      </Modal>
    </ModalOverlay>
  );
}
