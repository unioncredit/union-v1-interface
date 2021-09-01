import {
  Badge,
  Text,
  Label,
  Table,
  TableRow,
  TableCell,
  Button,
  Bar,
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
  type,
  title,
  status,
}) {
  const total = againstCount + forCount;
  const percentageFor = forCount / total;

  return (
    <TableRow>
      <TableCell span={3}>
        <Text>{title}</Text>
        <Label>{date}</Label>
      </TableCell>
      <TableCell span={1} align="center">
        <Badge color={statusColorMap[status] || "blue"} label={status} />
      </TableCell>
      <TableCell span={1} align="center" className="hide-lt-600">
        <Text>{type}</Text>
      </TableCell>
      <TableCell span={1} align="right">
        <Label as="p" size="small">
          {toPercent(percentageFor)} yes
        </Label>
        <Bar percentage={percentageFor * 100} secondaryBar />
      </TableCell>
      <TableCell span={1}>
        <Link href={`/governance/proposals/${id}`}>
          <Button
            variant="pill"
            label="Cast vote"
            icon="chevron"
            iconPosition="end"
            ml="auto"
          />
        </Link>
      </TableCell>
    </TableRow>
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
