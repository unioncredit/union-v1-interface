import { Stat, Button, Grid, Card, Label, Tooltip } from "@unioncredit/ui";
import { ReactComponent as TooltipIcon } from "@unioncredit/ui/lib/icons/tooltip.svg";

import {
  BorrowModal,
  useBorrowModal,
  PaymentModal,
  usePaymentModal,
  usePaymentReminderModal,
  PaymentReminderModal,
} from "components-ui/modals";
import { Dai } from "components-ui";
import format, { formatScaled } from "util/formatValue";
import { roundUp } from "util/numbers";
import useToken from "hooks/useToken";
import useBorrowData from "hooks/data/useBorrowData";
import useCreditLimit from "hooks/data/useCreditLimit";
import useVouchData from "hooks/data/useVouchData";
import useTokenBalance from "hooks/data/useTokenBalance";
import { ZERO } from "constants/variables";

import styles from "./BorrowStatsCard.module.css";
import { formatUnits } from "@ethersproject/units";

export function BorrowStatsCard() {
  const { open: openBorrow } = useBorrowModal();
  const { open: openPayment } = usePaymentModal();
  const { open: openPaymentReminder } = usePaymentReminderModal();

  const { data: borrowData, mutate: updateBorrowData } = useBorrowData();
  const { data: vouchData, mutate: updateVouchData } = useVouchData();
  const { data: creditLimit = ZERO, mutate: updateCreditLimit } =
    useCreditLimit();

  const DAI = useToken("DAI");
  const { data: daiBalance = ZERO, mutate: updateDaibalance } =
    useTokenBalance(DAI);

  const {
    borrowed = ZERO,
    owed = ZERO,
    interest = ZERO,
    paymentDueDate = "-",
  } = !!borrowData && borrowData;

  const totalVouch = vouchData
    ? vouchData.reduce((acc, data) => acc.add(data.vouched), ZERO)
    : ZERO;

  const unavailable = vouchData
    ? vouchData.reduce(
        (acc, data) => acc.add(data.vouched.sub(data.available)),
        ZERO
      )
    : ZERO;

  const onComplete = async () => {
    await updateCreditLimit();
    await updateVouchData();
    await updateBorrowData();
    await updateDaibalance();
  };

  const creditLimitView = formatScaled(creditLimit, 2);

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
                  value={<Dai value={creditLimitView} />}
                />
                <Stat
                  mt="24px"
                  align="center"
                  label="Vouch"
                  value={<Dai value={format(formatUnits(totalVouch), 2)} />}
                  after={
                    <Label m={0}>
                      {format(formatUnits(unavailable), 2)} DAI unavailable
                      <Tooltip content="These are funds which are currently tied up elsewhere and as a result, not available to borrow at this time">
                        <TooltipIcon width="16px" />
                      </Tooltip>
                    </Label>
                  }
                />
                <Button mt="28px" label="Borrow funds" onClick={openBorrow} />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stat
                  size="large"
                  align="center"
                  label="Balance owed"
                  value={<Dai value={formatScaled(owed, 2)} />}
                />

                <Stat
                  align="center"
                  label="Minimum due"
                  mt="24px"
                  value={<Dai value={roundUp(formatUnits(interest, 18))} />}
                  after={
                    <Label
                      size="small"
                      color="blue500"
                      onClick={openPaymentReminder}
                      className={styles.reminder}
                    >
                      {paymentDueDate}
                    </Label>
                  }
                />
                <Button
                  label="Make a payment"
                  onClick={openPayment}
                  variant="secondary"
                  mt="28px"
                  disabled={borrowed.lte(0)}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Card.Body>
      </Card>
      <BorrowModal
        creditLimit={creditLimit}
        borrowData={borrowData}
        onComplete={onComplete}
        daiBalance={daiBalance}
      />
      <PaymentModal
        daiBalance={daiBalance}
        borrowData={borrowData}
        onComplete={onComplete}
      />
      <PaymentReminderModal />
    </>
  );
}
