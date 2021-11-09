import { Grid, Box } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import {
  View,
  UserVotingOverview,
  RecentProposals,
  GovernanceStatsCard,
} from "components-ui";
import useAllProposalData from "hooks/governance/useAllProposalData";

import { config } from "./config";

export default function GovernanceView() {
  const { account } = useWeb3React();
  const { data } = useAllProposalData();

  return (
    <View tabItems={config.tabItems}>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col>
            <Box mt="24px">
              <GovernanceStatsCard />
            </Box>
            <Box mt="24px">
              <UserVotingOverview address={account} />
            </Box>
            <Box mt="24px">
              <RecentProposals data={data?.slice(0, 3)} />
            </Box>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </View>
  );
}
