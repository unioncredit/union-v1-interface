import { Card, Button, Box } from "@unioncredit/ui";
import { Link } from "react-router-dom";
import { ProposalsTable } from "./ProposalsTable";

export function RecentProposals({ data }) {
  return (
    <Card>
      <Card.Header
        title="Recent Proposals"
        subTitle="Most recent proposals"
        action={
          <Link to="/governance/proposals">
            <Button variant="secondary" label="View all" inline />
          </Link>
        }
      />
      <Box mb="24px" />
      <ProposalsTable data={data} />
    </Card>
  );
}
