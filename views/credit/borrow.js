import format from "util/formatValue";
import { TransactionHistory, Wrapper, ContactsSummary } from "components-ui";
import { roundDown, roundUp } from "util/numbers";
import useBorrowData from "hooks/data/useBorrowData";
import useCreditLimit from "hooks/data/useCreditLimit";
import useVouchData from "hooks/data/useVouchData";
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
} from "union-ui";

import { config } from "./config";

const getPctUsed = (borrowed, creditLimit) => {
  if (creditLimit === 0 && borrowed === 0) return 0;
  return borrowed / (creditLimit + borrowed);
};

export default function BorrowView() {
  const { data: creditLimit = 0 } = useCreditLimit();
  const { data: borrowData } = useBorrowData();
  const { data: vouchData } = useVouchData();

  const {
    borrowedRounded = 0,
    interest = 0,
    paymentDueDate = "-",
  } = !!borrowData && borrowData;

  const pctUsed = getPctUsed(borrowedRounded, roundDown(creditLimit));
  // TODO: what should this actually be?
  const unavailable = creditLimit - creditLimit;

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Stats mb="40px">
        <Box>
          <Stat
            label="Credit Limit"
            value={`DAI ${format(roundDown(creditLimit))}`}
            cta={
              <Button
                variant="pill"
                icon="chevron"
                iconPosition="end"
                label="Credit Limit"
              />
            }
          />
          <Stat
            label="Balance owed"
            value={`DAI ${borrowedRounded}`}
            caption={<Bar label={`${pctUsed}%`} percentage={pctUsed} />}
          />
          <Stat
            label="Available Credit"
            // TODO: what should this actually be?
            value={`DAI ${format(roundDown(creditLimit))}`}
            caption={
              <Label as="p" size="small">
                {format(unavailable)} Unavailable{" "}
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
            value={roundUp(interest)}
            caption={paymentDueDate}
          />
        </Box>
        <ButtonRow direction="vertical">
          <Button icon="borrow" label="Borrow funds" />
          <Button icon="repayment" variant="secondary" label="Make a payment" />
        </ButtonRow>
      </Stats>
      <Grid>
        <Row>
          <Col md={4}>
            <Heading level={2}>Credit providers</Heading>
            <Text mb="12px">Accounts providing you with credit</Text>
            <ContactsSummary data={vouchData} />
          </Col>
          <Col md={8}>
            <Heading level={2}>Transaction History</Heading>
            <Text mb="12px">Your credit based transaction history</Text>
            <TransactionHistory />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
