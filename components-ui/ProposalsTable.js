import {
  Badge,
  Text,
  Label,
  Table,
  TableRow,
  TableCell,
  Button,
  Bar,
} from "union-ui";

function ProposalsTableRow() {
  return (
    <TableRow>
      <TableCell span={3}>
        <Text>Formalize the UIP Voting Process</Text>
        <Label>10:30am - 29 October</Label>
      </TableCell>
      <TableCell span={1} align="center">
        <Badge color="blue" label="Live" />
      </TableCell>
      <TableCell span={1} align="center">
        <Text>on-chain</Text>
      </TableCell>
      <TableCell span={1} align="right">
        <Label as="p" size="small">
          75% yes
        </Label>
        <Bar percentage={76} secondaryBar />
      </TableCell>
      <TableCell span={1}>
        <Button
          variant="pill"
          label="Cast vote"
          icon="chevron"
          iconPosition="end"
          ml="auto"
        />
      </TableCell>
    </TableRow>
  );
}

export function ProposalsTable() {
  return (
    <Table>
      <ProposalsTableRow />
    </Table>
  );
}
