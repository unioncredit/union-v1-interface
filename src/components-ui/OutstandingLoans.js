import {
  Badge,
  Text,
  Table,
  TableCell,
  TableRow,
  Box,
  Pagination,
  EmptyState,
} from "@unioncredit/ui";
import usePublicData from "hooks/usePublicData";
import { Avatar, Dai } from "components-ui";
import format from "util/formatValue";
import usePagination from "hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { formatUnits } from "@ethersproject/units";

function OutstandingLoansRow({ address, used, isMember, isOverdue }) {
  const navigate = useNavigate();
  const { name } = usePublicData(address);

  return (
    <TableRow onClick={() => navigate(`/contacts?contact=${address}`)}>
      <TableCell span={1}>
        <Box align="center">
          <Avatar address={address} />
          <Text ml="8px" grey={400}>
            {name}
          </Text>
        </Box>
      </TableCell>
      <TableCell>
        {!isMember ? (
          <Badge color="grey" label="Not a member" />
        ) : isOverdue ? (
          <Badge color="red" label="Overdue" />
        ) : (
          <Badge color="blue" label="Healthy" />
        )}
      </TableCell>
      <TableCell align="right">
        <Text grey={700}>
          <Dai value={format(formatUnits(used))} />
        </Text>
      </TableCell>
    </TableRow>
  );
}

function OutstandingLoansEmpty() {
  return <EmptyState label="No loans" />;
}

export function OutstandingLoans({ data }) {
  const loans = data && data.filter((item) => item.used.gt("0"));

  const { data: pagedLoans, maxPages, page, setPage } = usePagination(loans);

  return (
    <>
      <Table>
        {loans && loans.length > 0 ? (
          pagedLoans.map((row, i) => <OutstandingLoansRow key={i} {...row} />)
        ) : (
          <OutstandingLoansEmpty />
        )}
      </Table>
      <Pagination
        mt="18px"
        pages={maxPages}
        activePage={page}
        onClick={setPage}
      />
    </>
  );
}
