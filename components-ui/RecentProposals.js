import Link from "next/link";
import { Card, Button } from "union-ui";
import { ProposalsTable } from "./ProposalsTable";

export function RecentProposals({ data }) {
  return (
    <Card>
      <Card.Header
        title="Recent Proposals"
        subTitle="Most recent proposals"
        action={
          <Link href="/governance/proposals">
            <Button variant="secondary" label="View all" inline />
          </Link>
        }
      />
      <Card.Body>
        <ProposalsTable data={data} />
      </Card.Body>
    </Card>
  );
}
