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
import { Wrapper, UserVotingOverview, LiveProposals } from "components-ui";

import { config } from "./config";

export default function GovernanceView() {
  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Stats mb="40px" title="Protocol Statistics">
        <Box>
          <Stat label="Total staked" value="$3,200" />
          <Stat label="Lending pool" value="$1,600" />
          <Stat label="Outstanding loans" value="$1,200.58" />
          <Stat label="Defaulted" value="$218.52" />
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
            <UserVotingOverview />
          </Col>
          <Col md={8}>
            <Heading level={2}>Live Proposals</Heading>
            <Text mb="12px">Proposals currently collecting votes</Text>
            <LiveProposals />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
