import {
  Text,
  Table,
  TableCell,
  TableRow,
  Label,
  Avatar,
  Box,
  Skeleton,
} from "union-ui";
import { Dai } from "components-ui";
import useTransactions from "hooks/data/useTransactions";
import createArray from "util/createArray";
import Repayment from "svgs/Repayment";
import Borrowed from "svgs/Borrowed";
import format from "util/formatValue";

function TransactionHistoryRow({ address, amount, type, date }) {
  return (
    <TableRow>
      <TableCell>
        <Box>
          {address ? (
            <Avatar address={address} />
          ) : type === "BORROW" ? (
            <Borrowed />
          ) : (
            <Repayment />
          )}
          <Text grey={700} ml="8px">
            {type === "BORROW" ? "Borrow" : "Repayment"}
          </Text>
        </Box>
      </TableCell>
      <TableCell>
        <Label size="small" grey={400}>
          {date}
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
        <Avatar />
      </TableCell>
      <TableCell align="right">
        <Skeleton size="small" variant="secondary" />
      </TableCell>
    </TableRow>
  );
}

function TransactionHistoryEmpty() {
  return (
    <TableRow>
      <TableCell span={2}>
        <Text>No transactions</Text>
      </TableCell>
    </TableRow>
  );
}

export function TransactionHistory() {
  const { data, isLoading, isEmpty, loadingCount = 1 } = useTransactions();

  return (
    <Table disableCondensed>
      {isEmpty && !isLoading && <TransactionHistoryEmpty />}

      {data.map((tx) => (
        <TransactionHistoryRow key={tx.hash} {...tx} />
      ))}

      {isLoading &&
        loadingCount &&
        loadingCount > 0 &&
        createArray(loadingCount).map((_, i) => (
          <TransactionHistorySkeletonRow key={i} />
        ))}
    </Table>
  );
}
