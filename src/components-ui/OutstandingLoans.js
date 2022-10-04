import {
  Text,
  Table,
  TableCell,
  TableRow,
  Pagination,
  EmptyState,
  Label,
  TableHead,
} from "@unioncredit/ui";
import { formatUnits } from "@ethersproject/units";

import usePublicData from "hooks/usePublicData";
import { Avatar } from "components-ui";
import format from "util/formatValue";
import usePagination from "hooks/usePagination";
import { useNavigate } from "react-router-dom";
import truncateName from "util/truncateName";
import truncateAddress from "util/truncateAddress";
import { StatusBadge } from "./StatusBadge";

function OutstandingLoansRow({ address, used }) {
  const navigate = useNavigate();
  const { name, ENSName } = usePublicData(address);

  const [primaryLabel] = [ENSName, name].filter((label) => Boolean(label));

  return (
    <TableRow onClick={() => navigate(`/contacts?contact=${address}`)}>
      <TableCell fixedSize>
        <Avatar address={address} />
      </TableCell>
      <TableCell>
        <Label as="p" grey={700} m={0}>
          {truncateName(primaryLabel)}
        </Label>
        <Label as="p" size="small" grey={400} m={0}>
          {truncateAddress(address)}
        </Label>
      </TableCell>
      <TableCell>
        <StatusBadge address={address} />
      </TableCell>
      <TableCell align="right">
        <Text grey={700}>{format(formatUnits(used), 2)}</Text>
      </TableCell>
    </TableRow>
  );
}

function OutstandingLoansEmpty() {
  return <EmptyState label="No loans" />;
}

export function OutstandingLoans({ data }) {
  const loans = data && data.filter((item) => item.used.gt(0));

  const { data: pagedLoans, maxPages, page, setPage } = usePagination(loans);

  return (
    <>
      <Table>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="right">Balance Owed (DAI)</TableHead>
        </TableRow>
        {loans && loans.length > 0 ? (
          pagedLoans.map((row, i) => <OutstandingLoansRow key={i} {...row} />)
        ) : (
          <OutstandingLoansEmpty />
        )}
      </Table>
      <Pagination pages={maxPages} activePage={page} onClick={setPage} />
    </>
  );
}
