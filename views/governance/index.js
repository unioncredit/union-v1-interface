import {
  Stat,
  Stats,
  Box,
  Button,
  Grid,
  Row,
  Col,
  Heading,
  Text,
} from "union-ui";
import { useWeb3React } from "@web3-react/core";
import { Wrapper, UserVotingOverview, LiveProposals } from "components-ui";
import useStatisticsData from "hooks/governance/useStatisticsData";
import { useDefaultedAmount } from "hooks/stats/uTokenStats/useDefaultedAmount";
import format from "util/formatValue";
import { toPercent } from "util/numbers";

import { config } from "./config";
import useFilteredProposalData from "hooks/governance/useFilteredProposalData";

export default function GovernanceView() {
  const { account } = useWeb3React();
  const { data } = useStatisticsData();
  const { data: defaultedAmount } = useDefaultedAmount();
  const liveProposalData = useFilteredProposalData("active", "all");

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Stats mb="40px" title="Protocol Statistics">
        <Box>
          <Stat
            label="Lending pool"
            value={`${format(data?.lendingPoolBalance)} DAI`}
          />
          <Stat
            label="Outstanding loans"
            value={`${format(data?.outstandingLoans)} DAI`}
          />
          <Stat label="Defaulted" value={`${format(defaultedAmount)} DAI`} />
          <Stat
            label="Interest rate"
            value={toPercent(data?.interestRate ?? 0)}
          />
        </Box>
        <Button
          ml="auto"
          variant="secondary"
          icon="stats"
          label="View all platform stats"
        />
      </Stats>
      <Grid>
        <Row>
          <Col md={4}>
            <Heading level={2}>Your voting wallet</Heading>
            <Text mb="12px">Your voting profile overview</Text>
            <UserVotingOverview address={account} />
          </Col>
          <Col md={8}>
            <Heading level={2}>Live Proposals</Heading>
            <Text mb="12px">Proposals currently collecting votes</Text>
            <LiveProposals data={liveProposalData} />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
