import {
  Badge,
  Text,
  Label,
  Table,
  TableRow,
  TableCell,
  Skeleton,
  EmptyState,
} from "union-ui";
import Link from "next/link";
import { toPercent } from "util/numbers";
import createArray from "util/createArray";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

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
  live: "blue",
  canceled: "red",
};

function ProposalsTableRow({
  id,
  againstCount,
  forCount,
  title,
  status,
  startTimestamp,
}) {
  const total = againstCount + forCount;
  const percentageFor = total > 0 ? forCount / total : 0;

  const maxStrLength = 46;

  return (
    <Link href={`/governance/proposals/${id}`}>
      <TableRow>
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
            {toPercent(percentageFor)} yes &bull;{" "}
            {dayjs(Number(startTimestamp) * 1000).fromNow()}
          </Label>
        </TableCell>
      </TableRow>
    </Link>
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
