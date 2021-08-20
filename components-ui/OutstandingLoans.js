import {
  Badge,
  Button,
  Text,
  Table,
  TableCell,
  TableRow,
  Label,
  Box,
} from "union-ui";
import { useEditVouchModal, EditVouchModal } from "components-ui/modals";
import { useState } from "react";
import usePublicData from "hooks/usePublicData";
import { Avatar, Dai } from "components-ui";

function OutstandingLoansRow({ address, used, onManage, ...props }) {
  console.log({ props });
  const { name } = usePublicData(address);
  return (
    <TableRow>
      <TableCell span={1}>
        <Box align="center">
          <Avatar address={address} />
          <Box direction="vertical" ml="16px">
            <Text>
              <Dai value={used} />
            </Text>
            <Label mb={0}>{name}</Label>
          </Box>
        </Box>
      </TableCell>
      <TableCell></TableCell>
      <TableCell span={1}>
        <Badge label="Healthy" color="blue" />
      </TableCell>
      <TableCell align="right">
        <Button
          variant="pill"
          icon="chevron"
          iconPosition="end"
          label="Manage"
          onClick={onManage}
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
  const { open: openEditVouchModal, isOpen: isEditVouchModalOpen } =
    useEditVouchModal();
  const [selectedContact, setSelectedContact] = useState(null);
  const loans = data && data.filter((item) => item.used > 0);

  const handleManage = (contact) => () => {
    setSelectedContact(contact);
    openEditVouchModal();
  };

  return (
    <>
      <Table>
        {loans && loans.length > 0 ? (
          loans.map((row) => (
            <OutstandingLoansRow {...row} onManage={handleManage(row)} />
          ))
        ) : (
          <OutstandingLoansEmpty />
        )}
      </Table>
      {isEditVouchModalOpen && <EditVouchModal {...selectedContact} />}
    </>
  );
}
