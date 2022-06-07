import { Grid, Card, Box } from "@unioncredit/ui";

import { config } from "./config";
import { View, ProposalsTable } from "components-ui";
import { withUnsupportedChains } from "providers/UnsupportedChain";
import { GovernanceNotice } from "components-ui/GovernanceNotice";
import useProposals from "hooks/governance/useProposals";
import useIsSupportedFeature from "hooks/useIsSupportedFeature";

function ProposalsView() {
  const { data } = useProposals();

  const supportedFeature = useIsSupportedFeature();

  return (
    <View tabItems={config.tabItems}>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col xs={12} md={8} lg={6}>
            {!supportedFeature && (
              <Box mt="24px">
                <GovernanceNotice />
              </Box>
            )}
            <Card mt="24px">
              <Card.Header title="All Proposals" />
              <Box mb="24px" />
              <ProposalsTable data={data} />
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </View>
  );
}

export default withUnsupportedChains(ProposalsView, [421611, 42161]);
