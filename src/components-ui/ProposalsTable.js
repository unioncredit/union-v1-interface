import {
  Badge,
  Text,
  Label,
  Table,
  TableRow,
  TableCell,
  Skeleton,
  EmptyState,
} from "@unioncredit/ui";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";

import createArray from "util/createArray";
import { ZERO } from "constants/variables";
import { roundDown, toPercent, toNumber } from "util/numbers";

dayjs.extend(relativeTime);

function ProposalsTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell span={3}>
        <Skeleton shimmer height={16} width={100} />
      </TableCell>
      <TableCell span={1} align="center">
        <Skeleton shimmer height={16} width={60} />
      </TableCell>
      <TableCell span={1} align="right">
        <Skeleton shimmer height={16} width={20} />
      </TableCell>
    </TableRow>
  );
}

const statusColorMap = {
  executed: "green",
  active: "purple",
  canceled: "blue",
  defeated: "red",
};

function ProposalsTableRow({
  hash,
  abstainVotes,
  againstVotes,
  forVotes,
  title,
  status,
  startTimestamp,
}) {
  const navigate = useNavigate();

  const total = againstVotes.add(forVotes).add(abstainVotes);
  const percentageFor = total.gt(ZERO)
    ? toNumber(forVotes) / toNumber(total)
    : ZERO;

  const maxStrLength = 46;

  const handleClick = () => {
    navigate(`/governance/proposals/${hash}`);
  };

  return (
    <TableRow onClick={handleClick}>
      <TableCell>
        <Text mb="4px">
          {title.slice(0, maxStrLength)}
          {title.length > maxStrLength && "..."}
        </Text>
        <Label>
          <Badge
            color={statusColorMap[status] || "blue"}
            label={status.slice(0, 1).toUpperCase() + status.slice(1)}
            mr="8px"
          />
          {toPercent(roundDown(percentageFor))} yes &bull;{" "}
          {dayjs(Number(startTimestamp) * 1000).fromNow()}
        </Label>
      </TableCell>
    </TableRow>
  );
}

export function ProposalsTable({ data }) {
  if (data && data.length <= 0) {
    return <EmptyState label="There are no live proposals" />;
  }

  return (
    <Table>
      {!data &&
        createArray(2).map((_, i) => <ProposalsTableRowSkeleton key={i} />)}
      {data && data.map((row, i) => <ProposalsTableRow key={i} {...row} />)}
    </Table>
  );
}
