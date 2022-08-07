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
} from "@unioncredit/ui";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatUnits, parseEther, parseUnits } from "@ethersproject/units";

import isHash from "util/isHash";
import format from "util/formatValue";
import errorMessages from "util/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import { roundDown, toFixed } from "util/numbers";
import { useModal, useModalOpen } from "hooks/useModal";
import usePermits from "hooks/usePermits";
import useRepay from "hooks/payables/useRepay";
import useToken from "hooks/useToken";
import { useAddActivity } from "hooks/data/useActivity";
import useUToken from "hooks/contracts/useUToken";
import { Dai } from "components-ui/Dai";
import { Modal } from "components-ui/Modal";
import { Approval } from "components-ui/Approval";
import { REPAY_MARGIN, MIN_REPAY, ZERO, WAD } from "constants/variables";
import { APPROVE_DAI_REPAY_SIGNATURE_KEY } from "constants/app";

export const PAYMENT_MODAL = "payment-modal";

export const usePaymentModal = () => useModal(PAYMENT_MODAL);

export const usePaymentModalOpen = () => useModalOpen(PAYMENT_MODAL);

const PaymentType = {
  MIN: "min",
  MAX: "max",
  CUSTOM: "custom",
};

export function PaymentModal({ borrowData, daiBalance = ZERO, onComplete }) {
  const { library } = useWeb3React();
  const [paymentType, setPaymentType] = useState(PaymentType.MIN);

  const repay = useRepay();
  const DAI = useToken("DAI");
  const utoken = useUToken(DAI);
  const addActivity = useAddActivity();
  const isOpen = usePaymentModalOpen();

  const { close } = usePaymentModal();
  const { removePermit } = usePermits();

  const {
    borrowed = ZERO,
    interest = ZERO,
    owed = ZERO,
  } = !!borrowData && borrowData;

  const { reset, formState, register, watch, setValue, handleSubmit } = useForm(
    {
      mode: "onChange",
      reValidateMode: "onChange",
    }
  );

  const { isDirty, isSubmitting, errors } = formState;

  useEffect(() => {
    if (isOpen) {
      handleSelectOption(options[0]);
    }
  }, [isOpen]);

  const watchAmount = String(watch("amount") || 0);
  const amount = parseEther(watchAmount);
  const maxRepayWithMargin = owed.mul(REPAY_MARGIN).div(WAD);
  const maxRepay =
    daiBalance && daiBalance.lt(owed) ? daiBalance : maxRepayWithMargin;
  const minRepay = interest.lt(MIN_REPAY)
    ? MIN_REPAY
    : interest.mul(1010).div(1000);
  const newBalanceOwed = borrowed.sub(amount);

  const handleSelectOption = (option) => {
    setPaymentType(option.paymentType);
    if (option.value) {
      const value = formatUnits(option.value);
      setValue("amount", value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      reset();
    }
  };

  if (!isOpen) return null;

  const validate = async (val) => {
    if (!val) return errorMessages.required;

    const bnValue = parseUnits(String(val));
    if (bnValue.gt(daiBalance)) {
      return errorMessages.notEnoughBalanceDAI;
    }

    return true;
  };

  const handlePayment = async (values) => {
    let amountToRepay = ZERO;

    try {
      amountToRepay = parseUnits(String(values.amount));
      if (values.amount == formatUnits(maxRepay)) {
        amountToRepay = maxRepay;
      }
      const { hash } = await repay(amountToRepay);

      const amountToRepayView = format(formatUnits(amountToRepay), 2);
      await getReceipt(hash, library, {
        pending: `Paying back ${amountToRepayView} DAI`,
        success: `Paid back ${amountToRepayView} DAI`,
      });
      addActivity(activityLabels.repay({ amount: amountToRepay, hash }));
      if (typeof onComplete === "function") await onComplete();
      removePermit(APPROVE_DAI_REPAY_SIGNATURE_KEY);
      close();
      reset();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.repay({ amount: amountToRepay, hash }, true));
      handleTxError(err, `Failed to pay back ${amountToRepay} DAI`);
    }
  };

  const options = [
    {
      title: "Pay minimum due",
      content:
        "Make the payment required to cover the interest due on your loan",
      value: minRepay,
      display: format(formatUnits(minRepay, 18), 2),
      paymentType: PaymentType.MIN,
    },
    {
      title: maxRepay.gte(borrowed)
        ? "Pay-off entire loan"
        : "Pay maximum DAI available",
      content: maxRepay.gte(borrowed)
        ? "Make a payment to pay-off your current balance owed in its entirety"
        : "Make a payment with the maximum amount of DAI available in your connected wallet",
      display: format(formatUnits(maxRepay, 18), 2),
      value: maxRepay,
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
              <Grid.Col xs={6}>
                <Stat
                  mb="16px"
                  align="center"
                  size="medium"
                  label="Balance owed"
                  value={<Dai value={format(formatUnits(maxRepay, 18), 2)} />}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stat
                  mb="16px"
                  align="center"
                  size="medium"
                  label="Dai in Wallet"
                  value={<Dai value={format(formatUnits(daiBalance, 18), 2)} />}
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
                    {option.display && (
                      <Badge
                        ml="8px"
                        color={selected ? "blue" : "grey"}
                        label={<Dai value={option.display} />}
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
                        {...register("amount", { validate })}
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
              {format(formatUnits(newBalanceOwed, 18), 2)} DAI
            </Label>
          </Box>
          <ButtonRow fluid>
            <Approval
              label="Approve DAI for Loan Payments"
              amount={amount}
              tokenAddress={DAI}
              spender={utoken?.address}
              signatureKey={APPROVE_DAI_REPAY_SIGNATURE_KEY}
            >
              <Button
                fluid
                fontSize="large"
                disabled={!isDirty}
                loading={isSubmitting}
                label={`Repay ${format(formatUnits(amount), 2)} DAI`}
                onClick={handleSubmit(handlePayment)}
              />
            </Approval>
          </ButtonRow>
        </form>
      </Modal>
    </ModalOverlay>
  );
}
