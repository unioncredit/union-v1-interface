import { Grid, Box } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import {
  Wrapper,
  UserVotingOverview,
  LiveProposals,
  GovernanceStatsCard,
} from "components-ui";

import { config } from "./config";
import useFilteredProposalData from "hooks/governance/useFilteredProposalData";

export default function GovernanceView() {
  const { account } = useWeb3React();
  const liveProposalData = useFilteredProposalData("active", "all");

  return (
    <Wrapper title={config.title}>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col xs={12} md={8} lg={6}>
            <GovernanceStatsCard />
            <Box mt="24px">
              <LiveProposals data={liveProposalData} />
            </Box>
            <Box mt="24px">
              <UserVotingOverview address={account} />
            </Box>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}
