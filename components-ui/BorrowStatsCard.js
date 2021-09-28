import {
  BorrowModal,
  useBorrowModal,
  PaymentModal,
  usePaymentModal,
} from "components-ui/modals";
import { Dai } from "components-ui";
import { Stat, Button, Grid, Card, Bar } from "union-ui";
import format from "util/formatValue";
import { roundDown, roundUp, toPercent } from "util/numbers";
import useBorrowData from "hooks/data/useBorrowData";
import useCreditLimit from "hooks/data/useCreditLimit";
import useVouchData from "hooks/data/useVouchData";

export function BorrowStatsCard() {
  const { isOpen: isBorrowModalOpen, open: openBorrowModal } = useBorrowModal();
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

  const actualCreditLimit = vouchData
    ? vouchData.reduce(
        (acc, data) => acc + Number(data.trust) - Number(data.used),
        0
      )
    : 0;

  const totalCreditLimit = vouchData
    ? vouchData.reduce((acc, data) => acc + Number(data.trust), 0)
    : 0;

  const percentageBorrowed = borrowedRounded / totalCreditLimit;

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
          <Grid>
            <Grid.Row>
              <Grid.Col xs={6}>
                <Stat
                  size="large"
                  align="center"
                  label="Credit Limit"
                  value={<Dai value={format(roundDown(actualCreditLimit))} />}
                />
                <Stat
                  label="Available"
                  align="center"
                  mt="24px"
                  value={<Dai value={format(roundDown(creditLimit))} />}
                  after={
                    <Bar
                      label={toPercent(percentageBorrowed)}
                      percentage={percentageBorrowed * 100}
                    />
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
                  after={paymentDueDate}
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
    </>
  );
}
