import {
  Badge,
  Text,
  Table,
  TableCell,
  TableRow,
  Pagination,
  EmptyState,
  Label,
  TableHead,
  Card,
  Box,
  Skeleton,
} from "@unioncredit/ui";
import { formatUnits } from "@ethersproject/units";

import usePublicData from "hooks/usePublicData";
import { Avatar } from "components-ui";
import format from "util/formatValue";
import usePagination from "hooks/usePagination";
import { useNavigate } from "react-router-dom";
import truncateName from "util/truncateName";
import truncateAddress from "util/truncateAddress";
import createArray from "util/createArray";

function OutstandingLoansRow({ address, used, isMember, isOverdue }) {
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
        {!isMember ? (
          <Badge color="grey" label="Not a member" />
        ) : isOverdue ? (
          <Badge color="red" label="Overdue" />
        ) : (
          <Badge color="blue" label="Healthy" />
        )}
      </TableCell>
      <TableCell align="right">
        <Text grey={700}>{format(formatUnits(used), 2)}</Text>
      </TableCell>
    </TableRow>
  );
}

function TransactionHistorySkeletonRow() {
  return (
    <TableRow>
      <TableCell fixedSize>
        <Skeleton shimmer variant="circle" size={24} grey={200} />
      </TableCell>
      <TableCell>
        <Skeleton shimmer width={60} height={10} grey={200} />
      </TableCell>
      <TableCell>
        <Skeleton shimmer width={60} height={10} grey={200} />
      </TableCell>
      <TableCell align="right">
        <Skeleton shimmer width={30} height={10} grey={200} />
      </TableCell>
    </TableRow>
  );
}

function OutstandingLoansEmpty() {
  return <EmptyState label="No loans" />;
}

export function OutstandingLoans({ data }) {
  const loans = data && data.filter((item) => item.used.gt("0"));
  console.log(loans);
  const { data: pagedLoans, maxPages, page, setPage } = usePagination(loans);
  console.log(data);
  return (
    <>
      {data?.length <= 0 ? (
        <Card.Body>
          <OutstandingLoansEmpty />
        </Card.Body>
      ) : (
        <>
          <Box mb="24px" />
          <Table>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Balance Owed (DAI)</TableHead>
            </TableRow>
            {pagedLoans.map((row, i) => (
              <OutstandingLoansRow key={i} {...row} />
            ))}

            {!data &&
              createArray(3).map((_, i) => (
                <TransactionHistorySkeletonRow key={i} />
              ))}
          </Table>
          <Pagination pages={maxPages} activePage={page} onClick={setPage} />
        </>
      )}
    </>
  );
}
