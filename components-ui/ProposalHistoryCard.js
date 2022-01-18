import useProposalHistory from "hooks/governance/useProposalHistory";
import { Heading, Card, Steps } from "union-ui";

function parseData(data) {
  if (!data) return [];

  return data.map((item) => {
    const subTitle = new Date(Number(item.timestamp * 1000)).toDateString();

    if (item.action === "queued") {
      return { title: "Queued for Execution", subTitle };
    } else if (item.action === "proposed") {
      return { title: "Proposed", subTitle };
    } else if (item.action === "executed") {
      return { title: "Executed", subTitle };
    } else if (item.action === "votingStarted") {
      return { title: "Queued For Voting", subTitle };
    } else {
      return {};
    }
  });
}

export function ProposalHistoryCard({ id, startTimestamp }) {
  const { data = [] } = useProposalHistory(id);

  const hasHistory = data && data.length > 0;

  const allData = [
    ...data,
    ...(startTimestamp * 1000 <= Date.now()
      ? [
          {
            action: "votingStarted",
            timestamp: startTimestamp,
          },
        ]
      : []),
  ].sort((a, b) => Number(a.timestamp) - Number(b.timestamp));

  return (
    <Card>
      <Card.Body>
        <Heading>History</Heading>
        {hasHistory ? <Steps items={parseData(allData)} /> : "No history"}
      </Card.Body>
    </Card>
  );
}
