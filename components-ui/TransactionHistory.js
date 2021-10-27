import {
  Text,
  Table,
  TableCell,
  TableRow,
  Label,
  Avatar,
  Box,
  Skeleton,
  Pagination,
} from "union-ui";
import Borrow from "union-ui/lib/icons/borrow.svg";
import Repayment from "union-ui/lib/icons/repayment.svg";
import { Dai } from "components-ui";
import useTransactions from "hooks/data/useTransactions";
import usePagination from "hooks/usePagination";
import createArray from "util/createArray";
import format from "util/formatValue";
import formatDateTime from "util/formatDateTime";

function TransactionHistoryRow({ address, amount, type, ts }) {
  return (
    <TableRow>
      <TableCell>
        <Box align="center">
          {address ? (
            <Avatar address={address} />
          ) : type === "BORROW" ? (
            <Borrow width="24px" />
          ) : (
            <Repayment width="24px" />
          )}
          <Text grey={700} ml="8px">
            {type === "BORROW" ? "Borrow" : "Repayment"}
          </Text>
        </Box>
      </TableCell>
      <TableCell>
        <Label size="small" grey={400}>
          {formatDateTime(ts)}
        </Label>
      </TableCell>
      <TableCell align="right">
        <Text grey={700}>
          <Dai value={format(amount, 2)} />
        </Text>
      </TableCell>
    </TableRow>
  );
}

function TransactionHistorySkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Box align="center">
          <Skeleton shimmer variant="circle" size={24} grey={200} />
          <Skeleton shimmer width={60} height={10} grey={200} ml="6px" />
        </Box>
      </TableCell>
      <TableCell>
        <Skeleton shimmer width={80} height={10} grey={200} />
      </TableCell>
      <TableCell align="right">
        <Skeleton shimmer width={30} height={10} grey={200} />
      </TableCell>
    </TableRow>
  );
}

function TransactionHistoryEmpty() {
  return (
    <TableRow>
      <TableCell span={3}>
        <Text>No transactions</Text>
      </TableCell>
    </TableRow>
  );
}

export function TransactionHistory() {
  const { data, isLoading, isEmpty, loadingCount = 1 } = useTransactions();
  const { data: pagedData, page, maxPages, setPage } = usePagination(data);

  return (
    <>
      <Table disableCondensed>
        {isEmpty && !isLoading && <TransactionHistoryEmpty />}

        {pagedData.map((tx) => (
          <TransactionHistoryRow key={tx.hash} {...tx} />
        ))}

        {isLoading &&
          loadingCount &&
          loadingCount > 0 &&
          createArray(loadingCount).map((_, i) => (
            <TransactionHistorySkeletonRow key={i} />
          ))}
      </Table>
      <Pagination
        mt="24px"
        pages={maxPages}
        activePage={page}
        onClick={setPage}
      />
    </>
  );
}
