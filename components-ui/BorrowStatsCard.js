import {
  BorrowModal,
  useBorrowModal,
  PaymentModal,
  usePaymentModal,
  usePaymentReminderModal,
  PaymentReminderModal,
} from "components-ui/modals";
import { Dai } from "components-ui";
import { Stat, Button, Grid, Card, Label, Tooltip } from "@unioncredit/ui";
import TooltipIcon from "@unioncredit/ui/lib/icons/tooltip.svg";
import format from "util/formatValue";
import { roundDown, roundUp } from "util/numbers";
import useBorrowData from "hooks/data/useBorrowData";
import useCreditLimit from "hooks/data/useCreditLimit";
import useVouchData from "hooks/data/useVouchData";

import styles from "./BorrowStatsCard.module.css";

export function BorrowStatsCard() {
  const { isOpen: isBorrowModalOpen, open: openBorrowModal } = useBorrowModal();
  const { isOpen: isPaymentReminderModalOpen, open: openPaymentReminderModal } =
    usePaymentReminderModal();
  const { isOpen: isPaymentModalOpen, open: openPaymentModal } =
    usePaymentModal();

  const { data: creditLimit = 0, mutate: updateCreditLimit } = useCreditLimit();
  const { data: borrowData, mutate: updateBorrowData } = useBorrowData();
  const { data: vouchData, mutate: updateVouchData } = useVouchData();

  const {
    borrowedRounded = 0,
    interest = 0,
    paymentDueDate = "-",
    paymentPeriod = "-",
    fee = 0,
    isOverdue = false,
  } = !!borrowData && borrowData;

  const totalVouch = vouchData
    ? vouchData.reduce((acc, data) => acc + Number(data.vouched), 0)
    : 0;

  const unavailable = vouchData
    ? vouchData.reduce(
        (acc, data) => acc + Number(data.vouched) - Number(data.available),
        0
      )
    : 0;

  const onComplete = async () => {
    await updateCreditLimit();
    await updateVouchData();
    await updateBorrowData();
  };

  return (
    <>
      <Card>
        <Card.Header title="Borrow & Repay" align="center" />
        <Card.Body>
          <Grid divider>
            <Grid.Row>
              <Grid.Col xs={6}>
                <Stat
                  size="large"
                  align="center"
                  label="Available credit"
                  value={<Dai value={format(roundDown(creditLimit, 2))} />}
                />
                <Stat
                  mt="24px"
                  align="center"
                  label="Vouch"
                  value={<Dai value={format(totalVouch, 2)} />}
                  after={
                    <Label m={0}>
                      {format(unavailable, 2) || 0} DAI unavailable
                      <Tooltip content="These are funds which are currently tied up elsewhere and as a result, not available to borrow at this time">
                        <TooltipIcon width="16px" />
                      </Tooltip>
                    </Label>
                  }
                />
                <Button
                  mt="28px"
                  label="Borrow funds"
                  onClick={openBorrowModal}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stat
                  size="large"
                  align="center"
                  label="Balance owed"
                  value={<Dai value={borrowedRounded} />}
                />

                <Stat
                  align="center"
                  label="Minimum due"
                  mt="24px"
                  value={<Dai value={roundUp(interest)} />}
                  after={
                    <Label
                      size="small"
                      color="blue500"
                      onClick={openPaymentReminderModal}
                      className={styles.reminder}
                    >
                      {paymentDueDate}
                    </Label>
                  }
                />
                <Button
                  label="Make a payment"
                  onClick={openPaymentModal}
                  variant="secondary"
                  mt="28px"
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Card.Body>
      </Card>
      {isBorrowModalOpen && (
        <BorrowModal
          {...{
            fee,
            isOverdue,
            creditLimit,
            paymentDueDate,
            paymentPeriod,
            balanceOwed: borrowedRounded,
            onComplete,
          }}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentModal
          {...{
            paymentDueDate,
            balanceOwed: borrowedRounded,
            interest,
            onComplete,
          }}
        />
      )}
      {isPaymentReminderModalOpen && <PaymentReminderModal />}
    </>
  );
}
