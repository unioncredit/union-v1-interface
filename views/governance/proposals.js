import { Grid, Card } from "union-ui";
import { View, ProposalsTable } from "components-ui";
import useFilteredProposalData from "hooks/governance/useFilteredProposalData";

import { config } from "./config";

export default function ProposalsView() {
  const typeFilter = "all";
  const statusFilter = "all";
  const data = useFilteredProposalData(statusFilter, typeFilter);

  return (
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
  );
}
