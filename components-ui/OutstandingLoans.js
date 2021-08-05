import { Text, Table, TableCell, TableRow, Label, Avatar } from "union-ui";

function OutstandingLoansRow() {
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

function OutstandingLoansEmpty() {
  return (
    <TableRow>
      <TableCell>
        <Text>No loans</Text>
      </TableCell>
    </TableRow>
  );
}

export function OutstandingLoans() {
  return (
    <Table>
      <OutstandingLoansEmpty />
    </Table>
  );
}
