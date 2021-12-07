import {
  ModalOverlay,
  Box,
  Input,
  Stat,
  Button,
  ButtonRow,
  Grid,
  Label,
  Card,
  Badge,
  Control,
  Collapse,
} from "union-ui";
import { useEffect, useState } from "react";
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
import useUnionContract from "hooks/contracts/useUTokenContract";
import { Approval } from "components-ui";
import { APPROVE_DAI_REPAY_SIGNATURE_KEY } from "constants/app";
import usePermits from "hooks/usePermits";

export const PAYMENT_MODAL = "payment-modal";

export const usePaymentModal = () => useModal(PAYMENT_MODAL);

const PaymentType = {
  MIN: "min",
  MAX: "max",
  CUSTOM: "custom",
};

export function PaymentModal({ balanceOwed, interest, onComplete }) {
  const [paymentType, setPaymentType] = useState(PaymentType.MIN);
  const addActivity = useAddActivity();
  const { library } = useWeb3React();
  const { close } = usePaymentModal();
  const curToken = useCurrentToken("DAI");
  const repay = useRepay();
  const utoken = useUnionContract();
  const { removePermit } = usePermits();

  const { reset, errors, formState, register, watch, setValue, handleSubmit } =
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

  const newBalanceOwed = calculateBalanceOwed - amount;

  const handleSelectOption = (option) => {
    setPaymentType(option.paymentType);
    if (option.value) {
      setValue("amount", option.value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      reset();
    }
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
      removePermit(APPROVE_DAI_REPAY_SIGNATURE_KEY);
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.repay({ amount: amountToRepay, hash }, true));
      handleTxError(err, `Failed to pay back ${amountToRepay} DAI`);
    }
  };

  useEffect(() => {
    if (interest) {
      setValue("amount", roundUp(interest), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [interest]);

  const options = [
    {
      title: "Pay minimum due",
      content:
        "Make the payment required to cover the interest due on your loan",
      value: roundUp(interest),
      paymentType: PaymentType.MIN,
    },
    {
      title:
        calculateMaxValue >= calculateBalanceOwed
          ? "Pay-off entire loan"
          : "Pay maximum DAI available",
      content:
        calculateMaxValue >= calculateBalanceOwed
          ? "Make a payment to pay-off your current balance owed in its entirety"
          : "Make a payment with the maximum amount of DAI available in your connected wallet",
      value: calculateMaxValue,
      paymentType: PaymentType.MAX,
    },
  ];

  const isCustomSelected = paymentType === PaymentType.CUSTOM;

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
            </Grid.Row>
          </Grid>

          {options.map((option) => {
            const selected = option.paymentType === paymentType;

            return (
              <Card
                key={option.paymentType}
                variant={selected ? "blue" : "primary"}
                bordered={selected}
                packed
                mt="8px"
              >
                <Card.Body>
                  <Box justify="space-between">
                    <Box direction="vertical">
                      <Control
                        onClick={() => handleSelectOption(option)}
                        label={option.title}
                        type="radio"
                        checked={selected}
                      />
                      <Collapse active={selected}>
                        <Label as="p" mt="4px" mb={0}>
                          {option.content}
                        </Label>
                      </Collapse>
                    </Box>
                    {option.value && (
                      <Badge
                        ml="8px"
                        color={selected ? "blue" : "grey"}
                        label={<Dai value={option.value} />}
                      />
                    )}
                  </Box>
                </Card.Body>
              </Card>
            );
          })}

          <Card packed mt="8px" variant={isCustomSelected ? "blue" : "primary"}>
            <Card.Body>
              <Box align="center">
                <Box direction="vertical" fluid>
                  <Control
                    checked={isCustomSelected}
                    type="radio"
                    label="Custom payment amount"
                    onClick={() =>
                      handleSelectOption({ paymentType: PaymentType.CUSTOM })
                    }
                  />
                  <Collapse active={isCustomSelected}>
                    <Box fluid mt="12px">
                      <Input
                        type="number"
                        ref={register({ validate })}
                        name="amount"
                        suffix={<Dai />}
                        placeholder="0.0"
                        error={errors.amount?.message || false}
                      />
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            </Card.Body>
          </Card>

          <Box justify="space-between" mt="24px" mb="18px">
            <Label as="p" grey={400}>
              New balance owed
            </Label>
            <Label as="p" grey={400} m={0}>
              {format(newBalanceOwed)} DAI
            </Label>
          </Box>
          <ButtonRow fluid>
            <Approval
              label="Approve DAI for Loan Payments"
              amount={amount}
              tokenAddress={curToken}
              spender={utoken.address}
              signatureKey={APPROVE_DAI_REPAY_SIGNATURE_KEY}
            >
              <Button
                label={`Repay ${amount} DAI`}
                fluid
                mt="16px"
                loading={isSubmitting}
                disabled={!isDirty}
                onClick={handleSubmit(handlePayment)}
                fontSize="large"
              />
            </Approval>
          </ButtonRow>
        </form>
      </Modal>
    </ModalOverlay>
  );
}
