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
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseEther } from "@ethersproject/units";

import isHash from "util/isHash";
import format from "util/formatValue";
import errorMessages from "util/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import { toFixed } from "util/numbers";
import { useModal, useModalOpen } from "hooks/useModal";
import usePermits from "hooks/usePermits";
import useRepay from "hooks/payables/useRepay";
import useToken from "hooks/useToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import { useAddActivity } from "hooks/data/useActivity";
import useUToken from "hooks/contracts/useUToken";
import { Dai } from "components-ui/Dai";
import { Modal } from "components-ui/Modal";
import { Approval } from "components-ui/Approval";
import { REPAY_MARGIN, MIN_REPAY, ZERO } from "constants/variables";
import { APPROVE_DAI_REPAY_SIGNATURE_KEY } from "constants/app";

export const PAYMENT_MODAL = "payment-modal";

export const usePaymentModal = () => useModal(PAYMENT_MODAL);

export const usePaymentModalOpen = () => useModalOpen(PAYMENT_MODAL);

const PaymentType = {
  MIN: "min",
  MAX: "max",
  CUSTOM: "custom",
};

export function PaymentModal({ borrowData, onComplete }) {
  const { library } = useWeb3React();
  const [paymentType, setPaymentType] = useState(PaymentType.MIN);

  const repay = useRepay();
  const DAI = useToken("DAI");
  const utoken = useUToken(DAI);
  const addActivity = useAddActivity();
  const isOpen = usePaymentModalOpen();

  const { close } = usePaymentModal();
  const { removePermit } = usePermits();
  const { data: daiBalance = ZERO } = useTokenBalance(DAI);

  const { borrowed = ZERO, interest = ZERO } = !!borrowData && borrowData;

  const { reset, formState, register, watch, setValue, handleSubmit } = useForm(
    {
      mode: "onChange",
      reValidateMode: "onChange",
    }
  );

  const { isDirty, isSubmitting, errors } = formState;

  if (!isOpen) return null;

  const watchAmount = String(watch("amount") || 0);
  const amount = BigNumber.from(parseEther(watchAmount));

  const borrowedFull = borrowed.mul(REPAY_MARGIN);
  const maxRepay = daiBalance.lt(borrowedFull) ? daiBalance : borrowedFull;
  const minRepay = interest.lt(MIN_REPAY) ? MIN_REPAY : interest;
  const newBalanceOwed = borrowed.sub(amount);

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

    const scaled = String(toFixed(val * 10 ** 18));
    const bnValue = BigNumber.from(scaled);
    if (bnValue.gt(daiBalance)) {
      return errorMessages.notEnoughBalanceDAI;
    }

    return true;
  };

  const handlePayment = async (values) => {
    const scaled = values.amount * 10 ** 18;
    const bnValue = BigNumber.from(scaled);
    const amountToRepay = bnValue.gt(daiBalance) ? daiBalance : bnValue;

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

  const options = [
    {
      title: "Pay minimum due",
      content:
        "Make the payment required to cover the interest due on your loan",
      value: format(formatUnits(minRepay, 18), 2),
      paymentType: PaymentType.MIN,
    },
    {
      title: maxRepay.gte(borrowed)
        ? "Pay-off entire loan"
        : "Pay maximum DAI available",
      content: maxRepay.gte(borrowed)
        ? "Make a payment to pay-off your current balance owed in its entirety"
        : "Make a payment with the maximum amount of DAI available in your connected wallet",
      value: format(formatUnits(maxRepay, 18), 2),
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
                  value={<Dai value={format(formatUnits(borrowed, 18), 2)} />}
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
                label={`Repay ${format(formatUnits(amount, 18), 2)} DAI`}
                onClick={handleSubmit(handlePayment)}
              />
            </Approval>
          </ButtonRow>
        </form>
      </Modal>
    </ModalOverlay>
  );
}
