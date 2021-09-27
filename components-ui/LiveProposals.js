import Link from "next/link";
import { Card, Button } from "union-ui";
import { ProposalsTable } from "./ProposalsTable";

export function LiveProposals({ data }) {
  return (
    <Card>
      <Card.Header
        title="Live Proposals"
        subTitle="Proposals currently live for voting"
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
