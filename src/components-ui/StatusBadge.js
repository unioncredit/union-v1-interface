import { Badge } from "@unioncredit/ui";
import { ZERO } from "constants/variables";
import useBorrowData from "hooks/data/useBorrowData";
import useIsMember from "hooks/data/useIsMember";
import useIsOverdue from "hooks/data/useIsOverdue";

export function StatusBadge({ address }) {
  const { data: isOverdue } = useIsOverdue(address);
  const { data: isMember } = useIsMember(address);
  const { data: borrowData } = useBorrowData(address);

  const borrowed = borrowData?.owed || ZERO;

  return (
    <>
      {borrowed.gt(0) ? (
        <Badge
          color={isOverdue ? "red" : "green"}
          label={isOverdue ? "Overdue" : "Borrowing"}
        />
      ) : isMember ? (
        <Badge color="blue" label="Member" />
      ) : (
        <Badge color="grey" label="Not a member" />
      )}
    </>
  );
}
