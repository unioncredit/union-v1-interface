import { Tabs, Grid, Row, Col, Box } from "union-ui";
import { Wrapper, ProposalsTable } from "components-ui";

import { config } from "./config";

export default function ProposalsView() {
  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Box mb="14px">
        <Tabs
          variant="secondary"
          items={[
            { id: "all", label: "All Proposals" },
            ...config.proposals.types,
          ]}
        />
      </Box>
      <Grid>
        <Row>
          <Col>
            <ProposalsTable filter="all" />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
