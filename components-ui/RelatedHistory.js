import { TransactionHistory } from "components-ui";
import useRelatedHistory from "hooks/data/useRelatedHistory";

export function RelatedHistory({ staker, borrower }) {
  const { data } = useRelatedHistory(staker, borrower);
  return <TransactionHistory data={data} />;
}
