import {
  BorrowModal,
  useBorrowModal,
  PaymentModal,
  usePaymentModal,
  usePaymentReminderModal,
  PaymentReminderModal,
} from "components-ui/modals";
import { Dai } from "components-ui";
import { Stat, Button, Grid, Card, Label } from "union-ui";
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

  const totalCreditLimit = vouchData
    ? vouchData.reduce((acc, data) => acc + Number(data.trust), 0)
    : 0;

  const actualCreditLimit = vouchData
    ? vouchData.reduce(
        (acc, data) => acc + Number(data.available) + Number(data.used),
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
                  label="Available"
                  align="center"
                  value={<Dai value={format(roundDown(creditLimit))} />}
                />
                <Stat
                  mt="24px"
                  align="center"
                  label="Credit Limit"
                  value={<Dai value={format(roundDown(actualCreditLimit))} />}
                  after={`of max ${format(totalCreditLimit)}`}
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
                    <Label size="small">
                      {paymentDueDate}{" "}
                      <u
                        onClick={openPaymentReminderModal}
                        className={styles.reminder}
                      >
                        (reminder)
                      </u>
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
