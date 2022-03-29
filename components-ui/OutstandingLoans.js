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
import Link from "next/link";
import usePublicData from "hooks/usePublicData";
import { Avatar, Dai } from "components-ui";
import format from "util/formatValue";
import usePagination from "hooks/usePagination";

function OutstandingLoansRow({ address, used }) {
  const { name } = usePublicData(address);
  return (
    <Link href={`/contacts?contact=${address}`}>
      <TableRow>
        <TableCell span={1}>
          <Box align="center">
            <Avatar address={address} />
            <Text ml="8px" grey={400}>
              {name}
            </Text>
          </Box>
        </TableCell>
        <TableCell>
          <Badge label="Healthy" color="blue" />
        </TableCell>
        <TableCell align="right">
          <Text grey={700}>
            <Dai value={format(used)} />
          </Text>
        </TableCell>
      </TableRow>
    </Link>
  );
}

function OutstandingLoansEmpty() {
  return <EmptyState label="No loans" />;
}

export function OutstandingLoans({ data }) {
  const loans = data && data.filter((item) => item.used > 0);

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
