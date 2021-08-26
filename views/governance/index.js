import { Stat, Stats, Button, Grid, Row, Col, Heading, Text } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import { Wrapper, UserVotingOverview, LiveProposals, Dai } from "components-ui";
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
      <Stats
        title="Protocol Statistics"
        buttons={[
          <Button
            key="view-all-stats"
            ml="auto"
            variant="secondary"
            icon="stats"
            label="View all platform stats"
          />,
        ]}
      >
        <Stat
          label="Lending pool"
          value={<Dai value={format(data?.lendingPoolBalance)} />}
        />
        <Stat
          label="Outstanding loans"
          value={<Dai value={format(data?.outstandingLoans)} />}
        />
        <Stat
          label="Defaulted"
          value={<Dai value={format(defaultedAmount)} />}
        />
        <Stat
          label="Interest rate"
          value={toPercent(data?.interestRate ?? 0)}
        />
      </Stats>
      <Grid>
        <Row>
          <Col md={4}>
            <Heading level={2} mt="40px">
              Your voting wallet
            </Heading>
            <Text mb="12px">Your voting profile overview</Text>
            <UserVotingOverview address={account} />
          </Col>
          <Col md={8}>
            <Heading level={2} mt="40px">
              Live Proposals
            </Heading>
            <Text mb="12px">Proposals currently collecting votes</Text>
            <LiveProposals data={liveProposalData} />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
