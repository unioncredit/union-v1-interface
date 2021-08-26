import useProposalHistory from "hooks/governance/useProposalHistory";
import { Heading, Card, Steps } from "union-ui";

function parseData(data) {
  if (!data) return [];

  return data.map((item) => {
    const subTitle = new Date(Number(item.timestamp * 1000)).toDateString();

    if (item.name === "ProposalQueued") {
      return { title: "Proposal Queued", subTitle };
    } else if (item.name === "ProposalCreated") {
      return { title: "Proposal Created", subTitle };
    } else if (item.name === "ProposalExecuted") {
      return { title: "Proposal Executed", subTitle };
    }
  });
}

export function ProposalHistoryCard({ id }) {
  const { data } = useProposalHistory(id);

  const hasHistory = data && data.length > 0;

  return (
    <Card>
      <Card.Body>
        <Heading>History</Heading>
        {hasHistory ? <Steps items={parseData(data)} /> : "No history"}
      </Card.Body>
    </Card>
  );
}
