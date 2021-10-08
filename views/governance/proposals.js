import Link from "next/link";
import { Grid, Card, Button, Box } from "union-ui";
import { Wrapper, ProposalsTable } from "components-ui";
import useFilteredProposalData from "hooks/governance/useFilteredProposalData";

import { config } from "./config";

export default function ProposalsView() {
  const typeFilter = "all";
  const statusFilter = "all";
  const data = useFilteredProposalData(statusFilter, typeFilter);

  return (
    <Wrapper title={config.title}>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col xs={12} md={8} lg={6}>
            <Box>
              <Link href="/governance">
                <Button
                  inlint
                  mt="24px"
                  mb="24px"
                  variant="lite"
                  label="Back to overview"
                  icon="arrow-left"
                  iconPosition="start"
                />
              </Link>
            </Box>
            <Card>
              <Card.Header title="All Proposals" />
              <Card.Body>
                <ProposalsTable data={data} />
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}
