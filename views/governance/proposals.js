import { useState } from "react";
import { Tabs, Grid, Row, Col, Box } from "union-ui";
import { Wrapper, ProposalsTable } from "components-ui";
import useFilteredProposalData from "hooks/governance/useFilteredProposalData";

import { config } from "./config";

export default function ProposalsView() {
  const typeFilter = "all";

  const [statusFilter, setStatusFilter] = useState("all");
  const data = useFilteredProposalData(statusFilter, typeFilter);

  const handleChangeType = (type) => {
    setStatusFilter(type.id);
  };

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Box mb="14px">
        <Tabs
          variant="secondary"
          items={[
            { id: "all", label: "All Proposals" },
            ...config.proposals.types,
          ]}
          onChange={handleChangeType}
        />
      </Box>
      <Grid>
        <Row>
          <Col>
            <ProposalsTable data={data} />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
