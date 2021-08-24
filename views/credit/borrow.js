import {
  Dai,
  Wrapper,
  TransactionHistory,
  ContactsSummaryRow,
  ContactsSummaryRowSkeleton,
} from "components-ui";
import {
  Text,
  Stats,
  Stat,
  Button,
  Bar,
  ButtonRow,
  Label,
  Tooltip,
  Grid,
  Row,
  Col,
  Box,
  Heading,
  Table,
  TableRow,
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

import { config } from "./config";

const getPctUsed = (borrowed, creditLimit) => {
  if (creditLimit === 0 && borrowed === 0) return 0;
  return borrowed / (creditLimit + borrowed);
};

export default function BorrowView() {
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
    <>
      <Wrapper title={config.title} tabItems={config.tabItems}>
        <Grid>
          <Row>
            <Col>
              <Stats
                buttons={[
                  <Button
                    icon="borrow"
                    label="Borrow funds"
                    onClick={openBorrowModal}
                  />,
                  <Button
                    icon="repayment"
                    variant="secondary"
                    label="Make a payment"
                    onClick={openPaymentModal}
                  />,
                ]}
              >
                <Stat
                  label="Credit Limit"
                  value={<Dai value={format(roundDown(actualCreditLimit))} />}
                  cta={
                    <Button
                      variant="pill"
                      icon="chevron"
                      iconPosition="end"
                      label="Request extra"
                      onClick={openCreditRequest}
                    />
                  }
                />
                <Stat
                  label="Balance owed"
                  value={<Dai value={borrowedRounded} />}
                  caption={
                    <Bar
                      label={`${toPercent(pctUsed)}`}
                      percentage={pctUsed * 100}
                    />
                  }
                />
                <Stat
                  label="Available Credit"
                  value={<Dai value={format(roundDown(creditLimit))} />}
                  caption={
                    <Label as="p" size="small">
                      <Dai value={format(unavailable)} /> Unavailable{" "}
                      <Tooltip
                        position="top"
                        content={`
                  These are funds which are currently tied up elsewhere and as a 
                  result, not available to borrow at this time
                `}
                      />
                    </Label>
                  }
                />
                <Stat
                  label={
                    <Text mb={0}>
                      Minimum Payment{" "}
                      <Tooltip
                        position="top"
                        content="Represents the amount due now in order to repay your loan on time"
                      />
                    </Text>
                  }
                  value={<Dai value={roundUp(interest)} />}
                  caption={paymentDueDate}
                />
              </Stats>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={4}>
              <Heading level={2} mt="40px">
                Credit providers
              </Heading>
              <Text mb="12px">Accounts providing you with credit</Text>
              <Table disableCondensed>
                {isVouchLoading
                  ? createArray(3).map((_, i) => (
                      <ContactsSummaryRowSkeleton key={i} />
                    ))
                  : vouchData.map((item, i) => (
                      <ContactsSummaryRow {...item} key={i} />
                    ))}
                <TableRow>
                  <TableCell />
                  <TableCell align="right" span={1}>
                    <Link href="/contacts">
                      <Button
                        inline
                        label="All contacts"
                        variant="pill"
                        icon="chevron"
                        iconPosition="end"
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              </Table>
            </Col>
            <Col md={6} lg={8}>
              <Heading level={2} mt="40px">
                Transaction History
              </Heading>
              <Text mb="12px">Your credit based transaction history</Text>
              <TransactionHistory />
            </Col>
          </Row>
        </Grid>
      </Wrapper>
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
      {isCreditRequestOpen && <CreditRequestModal />}
    </>
  );
}
