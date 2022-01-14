import useProposalHistory from "hooks/governance/useProposalHistory";
import { Heading, Card, Steps } from "union-ui";

function parseData(data) {
  if (!data) return [];

  return data.map((item) => {
    const subTitle = new Date(Number(item.timestamp * 1000)).toDateString();

    if (item.action === "queued") {
      return { title: "Queued", subTitle };
    } else if (item.action === "proposed") {
      return { title: "Proposed", subTitle };
    } else if (item.action === "executed") {
      return { title: "Executed", subTitle };
    } else {
      return {};
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
