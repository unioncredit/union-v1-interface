import {
  Dai,
  Wrapper,
  TransactionHistory,
  CreditContactsRow,
  CreditContactsRowSkeleton,
  BorrowStatsCard,ShareCard} from "components-ui";
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
  TableCell,
  Card,
  Box,
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
import { ContactsType } from "../contacts/config";

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
          <Row justify="center">
            <Col xs={6}>
              <Box mt="24px">
                <BorrowStatsCard />
              </Box>
              <Card mt="24px">
                <Card.Header
                  title="Credit providers"
                  subTitle="Accounts providing you with credit"
                />
                <Card.Body>
                  <Table disableCondensed>
                    {isVouchLoading
                      ? createArray(3).map((_, i) => (
                          <CreditContactsRowSkeleton key={i} />
                        ))
                      : vouchData.slice(0, 8).map((item) => (
                          <Link
                            key={item.address}
                            href={`/contacts?contactsType=${ContactsType.TRUSTS_YOU}&contact=${item.address}`}
                          >
                            <CreditContactsRow {...item} />
                          </Link>
                        ))}
                  </Table>
                </Card.Body>
              </Card>
              <ShareCard />
              <Card mt="24px">
                <Card.Header
                  title="Transaction History"
                  subTitle="Your credit based transaction history"
                />
                <Card.Body>
                  <TransactionHistory />
                </Card.Body>
              </Card>
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
