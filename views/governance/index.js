import { Alert, Grid, Box } from "@unioncredit/ui";
import Info from "@unioncredit/ui/lib/icons/wireInfo.svg";
import { useWeb3React } from "@web3-react/core";
import {
  View,
  UserVotingOverview,
  RecentProposals,
  GovernanceStatsCard,
} from "components-ui";
import useAllProposalData from "hooks/governance/useAllProposalData";

import { config } from "./config";
import useChainId from "hooks/useChainId";

export default function GovernanceView() {
  const chainId = useChainId();
  const { data } = useAllProposalData();
  const { chainId: actualChainId, account } = useWeb3React();

  const unsupportedFeature = actualChainId && actualChainId !== chainId;

  return (
    <>
      {unsupportedFeature && (
        <Alert
          icon={<Info />}
          packed
          mb="16px"
          size="small"
          variant="info"
          label="Governance is not supported on this chain. Showing governance data from mainnet"
        />
      )}
      <View tabItems={config.tabItems}>
        <Grid>
          <Grid.Row justify="center">
            <Grid.Col>
              <Box mt="24px">
                <GovernanceStatsCard />
              </Box>
              <Box mt="24px">
                {account && <UserVotingOverview address={account} />}
              </Box>
              <Box mt="24px">
                <RecentProposals data={data?.slice(0, 3)} />
              </Box>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </View>
    </>
  );
}
