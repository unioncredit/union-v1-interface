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
import useAsyncTransactions from "hooks/data/useAsyncTransactions";
import createArray from "util/createArray";
import Repayment from "svgs/Repayment";
import Borrowed from "svgs/Borrowed";
import format from "util/formatValue";

function TransactionHistoryRow({ address, amount, type, date }) {
  return (
    <TableRow>
      <TableCell span={1}>
        <Box align="center">
          {address ? (
            <Avatar address={address} />
          ) : type === "BORROW" ? (
            <Borrowed />
          ) : (
            <Repayment />
          )}
          <Box direction="vertical" ml="16px">
            <Text>{type === "BORROW" ? "Borrow" : "Repayment"}</Text>
            <Label>{date}</Label>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Text>
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
      <TableCell span={4}>
        <Skeleton size="medium" variant="primary" />
        <Skeleton size="small" variant="secondary" />
      </TableCell>
      <TableCell span={1} align="right">
        <Skeleton size="small" variant="secondary" />
      </TableCell>
    </TableRow>
  );
}

function TransactionHistoryEmpty() {
  return (
    <TableRow>
      <TableCell>
        <Text>No transactions</Text>
      </TableCell>
    </TableRow>
  );
}

export function TransactionHistory() {
  const { data, isLoading, isEmpty, loadingCount, chunk, chunks } =
    useAsyncTransactions();

  return (
    <Table disableCondensed>
      {isEmpty && !isLoading && <TransactionHistoryEmpty />}

      {data.map((tx) => (
        <TransactionHistoryRow {...tx} />
      ))}

      {loadingCount &&
        loadingCount > 0 &&
        createArray(loadingCount).map(() => <TransactionHistorySkeletonRow />)}

      {isLoading && process.env.NODE_ENV === "development" && (
        <TableRow>
          <TableCell>
            <Label size="small">
              Loading chunk {chunk}/{chunks}
            </Label>
          </TableCell>
        </TableRow>
      )}
    </Table>
  );
}
