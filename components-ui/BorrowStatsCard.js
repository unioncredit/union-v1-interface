import {
  Dai,
  Wrapper,
  TransactionHistory,
  CreditContactsRow,
  CreditContactsRowSkeleton,
} from "components-ui";
import {
  Text,
  Stat,
  Button,
  Bar,
  Label,
  Tooltip,
  Grid,
  Row,
  Col,
  Heading,
  Table,
  TableRow,
  Card,
  TableCell,
} from "union-ui";
import {
  BorrowModal,
  useBorrowModal,
  PaymentModal,
  usePaymentModal,
  CreditRequestModal,
  useCreditRequestModal,
} from "components-ui/modals";
import Link from "next/link";
import format from "util/formatValue";
import { roundDown, roundUp, toPercent } from "util/numbers";
import useBorrowData from "hooks/data/useBorrowData";
import useCreditLimit from "hooks/data/useCreditLimit";
import useVouchData from "hooks/data/useVouchData";
import createArray from "util/createArray";

const getPctUsed = (borrowed, creditLimit) => {
  if (creditLimit === 0 && borrowed === 0) return 0;
  return borrowed / (creditLimit + borrowed);
};

export function BorrowStatsCard() {
  const { isOpen: isBorrowModalOpen, open: openBorrowModal } = useBorrowModal();
  const { isOpen: isPaymentModalOpen, open: openPaymentModal } =
    usePaymentModal();
  const { isOpen: isCreditRequestOpen, open: openCreditRequest } =
    useCreditRequestModal();

  const { data: creditLimit = 0, mutate: updateCreditLimit } = useCreditLimit();
  const { data: borrowData, mutate: updateBorrowData } = useBorrowData();
  const { data: vouchData, mutate: updateVouchData } = useVouchData(8);

  const {
    borrowedRounded = 0,
    interest = 0,
    paymentDueDate = "-",
    paymentPeriod = "-",
    fee = 0,
    isOverdue = false,
  } = !!borrowData && borrowData;

  const pctUsed = getPctUsed(borrowedRounded, roundDown(creditLimit));
  const isVouchLoading = !vouchData;

  const actualCreditLimit = vouchData
    ? vouchData.reduce(
        (acc, data) => acc + Number(data.trust) - Number(data.used),
        0
      )
    : 0;
  const unavailable = actualCreditLimit - creditLimit;

  const onComplete = async () => {
    await updateCreditLimit();
    await updateVouchData();
    await updateBorrowData();
  };
  return (
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
                after="todo"
              />
              <Button label="Borrow funds" mt="28px" />
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
                align="center"
                label="Minimum due"
                mt="24px"
                value={<Dai value={roundUp(interest)} />}
                after={paymentDueDate}
              />
              <Button label="Make a payment" variant="secondary" mt="28px" />
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </Card.Body>
    </Card>
  );
}
