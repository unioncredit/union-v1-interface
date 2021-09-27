import {
  Badge,
  Text,
  Label,
  Table,
  TableRow,
  TableCell,
  Skeleton,
} from "union-ui";
import Link from "next/link";
import { toPercent } from "util/numbers";

function ProposalsTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell span={3}>
        <Skeleton size="medium" variant="primary" />
        <Skeleton size="small" variant="secondary" />
      </TableCell>
      <TableCell span={1} align="center">
        <Skeleton size="small" />
      </TableCell>
      <TableCell span={1} align="center">
        <Skeleton size="medium" variant="secondary" />
      </TableCell>
      <TableCell span={1} align="right">
        <Skeleton size="medium" variant="secondary" />
      </TableCell>
      <TableCell>
        <Skeleton size="small" />
      </TableCell>
    </TableRow>
  );
}

const statusColorMap = {
  executed: "green",
  live: "blue",
  cancelled: "red",
};

function ProposalsTableRow({
  id,
  againstCount,
  forCount,
  date,
  title,
  status,
}) {
  const total = againstCount + forCount;
  const percentageFor = forCount / total;

  return (
    <Link href={`/governance/proposals/${id}`}>
      <TableRow>
        <TableCell>
          <Text mb="4px">{title}</Text>
          <Label>
            <Badge
              color={statusColorMap[status] || "blue"}
              label={status}
              mr="8px"
            />
            {toPercent(percentageFor)} yes &bull; {date}
          </Label>
        </TableCell>
      </TableRow>
    </Link>
  );
}

export function ProposalsTable({ data }) {
  return (
    <Table>
      {!data && <ProposalsTableRowSkeleton />}
      {data && data.length <= 0 && (
        <TableRow>
          <TableCell>No proposals</TableCell>
        </TableRow>
      )}
      {data && data.map((row, i) => <ProposalsTableRow key={i} {...row} />)}
    </Table>
  );
}
