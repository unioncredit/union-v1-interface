import { Grid, Box } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import {
  View,
  UserVotingOverview,
  LiveProposals,
  GovernanceStatsCard,
} from "components-ui";

import useFilteredProposalData from "hooks/governance/useFilteredProposalData";

export default function GovernanceView() {
  const { account } = useWeb3React();
  const liveProposalData = useFilteredProposalData("active", "all");

  return (
    <View>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col>
            <Box mt="24px">
              <GovernanceStatsCard />
            </Box>
            <Box mt="24px">
              <LiveProposals data={liveProposalData} />
            </Box>
            <Box mt="24px">
              <UserVotingOverview address={account} />
            </Box>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </View>
  );
}
