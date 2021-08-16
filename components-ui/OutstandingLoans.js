import {
  Badge,
  Button,
  Text,
  Table,
  TableCell,
  TableRow,
  Label,
} from "union-ui";
import usePublicData from "hooks/usePublicData";
import { Avatar } from "components-ui";

function OutstandingLoansRow({ address, used }) {
  const { name } = usePublicData(address);
  return (
    <TableRow>
      <TableCell>
        <Avatar address={address} />
      </TableCell>
      <TableCell span={1}>
        <Text>DAI {used}</Text>
        <Label>{name}</Label>
      </TableCell>
      <TableCell span={1}>
        <Badge label="Healthy" color="blue" />
      </TableCell>
      <TableCell align="right">
        <Button
          variant="pill"
          icon="chevron"
          iconPosition="end"
          label="Manage"
        />
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

export function OutstandingLoans({ data }) {
  const loans = data && data.filter((item) => item.used > 0);

  return (
    <Table>
      {loans && loans.length > 0 ? (
        loans.map((row) => <OutstandingLoansRow {...row} />)
      ) : (
        <OutstandingLoansEmpty />
      )}
    </Table>
  );
}
