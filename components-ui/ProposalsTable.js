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

function ProposalsTableRow({ againstCount, forCount, date, type, title }) {
  const total = againstCount + forCount;
  const percentageFor = forCount / total;

  return (
    <TableRow>
      <TableCell span={3}>
        <Text>{title}</Text>
        <Label>{date}</Label>
      </TableCell>
      <TableCell span={1} align="center">
        <Badge color="blue" label="Live" />
      </TableCell>
      <TableCell span={1} align="center">
        <Text>{type}</Text>
      </TableCell>
      <TableCell span={1} align="right">
        <Label as="p" size="small">
          {toPercent(percentageFor)} yes
        </Label>
        <Bar percentage={percentageFor * 100} secondaryBar />
      </TableCell>
      <TableCell span={1}>
        <Link href="/governance/proposals/1">
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
      {data && data.map((row) => <ProposalsTableRow {...row} />)}
    </Table>
  );
}
