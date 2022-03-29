import { Grid, Card, Alert } from "@unioncredit/ui";
import Info from "@unioncredit/ui/lib/icons/wireInfo.svg";

import { View, ProposalsTable } from "components-ui";
import useFilteredProposalData from "hooks/governance/useFilteredProposalData";

import { config } from "./config";
import useChainId from "hooks/useChainId";
import { useWeb3React } from "@web3-react/core";
import { withUnsupportedChains } from "providers/UnsupportedChain";

function ProposalsView() {
  const chainId = useChainId();
  const { chainId: actualChainId } = useWeb3React();

  const typeFilter = "all";
  const statusFilter = "all";
  const data = useFilteredProposalData(statusFilter, typeFilter);

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
            <Grid.Col xs={12} md={8} lg={6}>
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
    </>
  );
}

export default withUnsupportedChains(ProposalsView, [421611, 42161]);
