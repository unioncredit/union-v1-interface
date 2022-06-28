import { TransactionHistory } from "components-ui";
import useRelatedHistory from "hooks/data/useRelatedHistory";

export function RelatedHistory({ account, staker, borrower }) {
  const { data } = useRelatedHistory(account, staker, borrower);
  return <TransactionHistory data={data} />;
}
