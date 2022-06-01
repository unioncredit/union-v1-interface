import useProposalHistory from "hooks/governance/useProposalHistory";
import useChainId from "hooks/useChainId";
import { Heading, Card, Steps } from "@unioncredit/ui";
import getEtherScanLink from "util/getEtherscanLink";

function parseData(chainId, data) {
  if (!data) return [];

  return data.map((item) => {
    const date = new Date(Number(item.timestamp * 1000));
    const subTitle = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
    const hash = item.id ? item.id.split("-")?.[0] : false;
    const href = hash && getEtherScanLink(chainId, hash, "TRANSACTION");

    if (item.action === "queued") {
      return { title: "Queued for Execution", subTitle, color: "blue", href };
    } else if (item.action === "proposed") {
      return { title: "Proposed", subTitle, color: "blue", href };
    } else if (item.action === "executed") {
      return { title: "Executed", subTitle, color: "green", href };
    } else if (item.action === "votingStarted") {
      return { title: "Queued For Voting", subTitle, color: "purple", href };
    } else {
      return {};
    }
  });
}

export function ProposalHistoryCard({ id, startTimestamp }) {
  const { data = [] } = useProposalHistory(id);
  const chainId = useChainId();

  const hasHistory = data && data.length > 0;

  const votingStarted = startTimestamp * 1000 <= Date.now() && {
    action: "votingStarted",
    timestamp: startTimestamp,
  };

  const allData = [...data, votingStarted]
    .filter(Boolean)
    .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));

  return (
    <Card>
      <Card.Body>
        <Heading>History</Heading>
        {hasHistory ? (
          <Steps items={parseData(chainId, allData)} />
        ) : (
          "No history"
        )}
      </Card.Body>
    </Card>
  );
}
