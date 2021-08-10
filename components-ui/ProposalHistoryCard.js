import { Heading, Card, Steps } from "union-ui";

// TODO: dummy items
const items = [
  { title: "Active", subTitle: "November 30th 2020 • 14:44" },
  { title: "Proposed", subTitle: "November 29th 2020 • 10:00" },
];

export function ProposalHistoryCard() {
  return (
    <Card>
      <Card.Body>
        <Heading>History</Heading>
        <Steps items={items} />
      </Card.Body>
    </Card>
  );
}

