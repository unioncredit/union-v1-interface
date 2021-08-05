import {
  Heading,
  Text,
  Table,
  TableCell,
  TableRow,
  Label,
  Avatar,
  Skeleton,
} from "union-ui";

function TransactionHistoryRow() {
  return (
    <TableRow>
      <TableCell>
        <Avatar />
      </TableCell>
      <TableCell span={4}>
        <Text>Repayment</Text>
        <Label>10:30am - 29 October</Label>
      </TableCell>
      <TableCell span={1} align="right">
        <Text>$1,200</Text>
      </TableCell>
    </TableRow>
  );
}

function TransactionHistoryEmpty() {
  return (
    <TableRow>
      <TableCell>
        <Text>No transactions</Text>
      </TableCell>
    </TableRow>
  );
}

export function TransactionHistory() {
  return (
    <Table>
      <TransactionHistoryEmpty />
    </Table>
  );
}
