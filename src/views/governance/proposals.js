import { useWeb3React } from "@web3-react/core";
import { Grid, Card, Box } from "@unioncredit/ui";

import { config } from "./config";
import useChainId from "hooks/useChainId";
import { View, ProposalsTable } from "components-ui";
import { withUnsupportedChains } from "providers/UnsupportedChain";
import { GovernanceNotice } from "components-ui/GovernanceNotice";
import useProposals from "hooks/governance/useProposals";

function ProposalsView() {
  const chainId = useChainId();
  const { chainId: actualChainId } = useWeb3React();

  const { data } = useProposals();

  const unsupportedFeature = actualChainId && actualChainId !== chainId;

  return (
    <View tabItems={config.tabItems}>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col xs={12} md={8} lg={6}>
            {unsupportedFeature && (
              <Box mt="24px">
                <GovernanceNotice />
              </Box>
            )}
            <Card mt="24px">
              <Card.Header title="All Proposals" />
              <Card.Body>
                <ProposalsTable data={data} />
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </View>
  );
}

export default withUnsupportedChains(ProposalsView, [421611, 42161]);
