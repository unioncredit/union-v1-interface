import { Text, Table, TableCell, TableRow } from "union-ui";

function LiveProposalsRow() {
  return (
    <TableRow>
      <TableCell>Not implemented</TableCell>
    </TableRow>
  );
}

function LiveProposalsEmpty() {
  return (
    <TableRow>
      <TableCell>
        <Text>No proposals</Text>
      </TableCell>
    </TableRow>
  );
}

export function LiveProposals() {
  return (
    <Table>
      <LiveProposalsEmpty />
    </Table>
  );
}
