import {
  Stats,
  Stat,
  Button,
  Bar,
  ButtonRow,
  Grid,
  Row,
  Col,
  Box,
  Heading,
  Text,
} from "union-ui";
import format from "util/formatValue";
import { roundDown } from "util/numbers";
import useStakeData from "hooks/data/useStakeData";
import { OutstandingLoans, Wrapper, ContactsSummary } from "components-ui";
import useTrustData from "hooks/data/useTrustData";

import { config } from "./config";

export default function LendView() {
  const { data: stakeData } = useStakeData();
  const { data: trustData } = useTrustData();

  const {
    totalStake = 0.0,
    utilizedStake = 0.0,
    defaultedStake = 0.0,
    withdrawableStake = 0.0,
  } = !!stakeData && stakeData;

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Stats mb="40px">
        <Box>
          <Stat
            label="Staked"
            value={`$${format(roundDown(totalStake))}`}
            cta={
              <Button
                variant="pill"
                icon="chevron"
                iconPosition="end"
                label="Adjust stake"
              />
            }
          />
          <Stat
            label="Utilized"
            value={`$${format(roundDown(utilizedStake))}`}
            caption={<Bar label={`48%`} percentage={48} />}
          />
          <Stat
            label="Withdrawable"
            value={`$${format(roundDown(withdrawableStake))}`}
            cta={
              <Button
                variant="pill"
                icon="chevron"
                iconPosition="end"
                label="Withdraw"
              />
            }
          />
          <Stat
            label="Defaulted"
            value={`$${format(roundDown(defaultedStake))}`}
          />
        </Box>
        <ButtonRow direction="vertical">
          <Button icon="vouch" label="Vouch for new contact" />
        </ButtonRow>
      </Stats>
      <Grid>
        <Row>
          <Col md={4}>
            <Heading level={2}>Contacts you trust</Heading>
            <Text mb="12px">Accounts you’re providing credit to</Text>
            <ContactsSummary data={trustData} />
          </Col>
          <Col md={8}>
            <Heading level={2}>Outstanding Loans</Heading>
            <Text mb="12px">Outstanding debt from contacts you trust</Text>
            <OutstandingLoans />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
``;
