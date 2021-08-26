import { Text, Table, TableCell, TableRow } from "union-ui";

// function UserVotingHistoryRow() {
//   return (
//     <TableRow>
//       <TableCell>Not implemented</TableCell>
//     </TableRow>
//   );
// }

function UserVotingHistoryEmpty() {
  return (
    <TableRow>
      <TableCell>
        <Text>No votes</Text>
      </TableCell>
    </TableRow>
  );
}

export function UserVotingHistory() {
  return (
    <Table>
      <UserVotingHistoryEmpty />
    </Table>
  );
}
