import {
  Text,
  Table,
  TableCell,
  TableRow,
  Label,
  Avatar,
  Skeleton,
} from "union-ui";
import useAsyncTransactions from "hooks/data/useAsyncTransactions";
import createArray from "util/createArray";

function TransactionHistoryRow({ address, amount, type, date }) {
  return (
    <TableRow>
      <TableCell>
        <Avatar address={address} />
      </TableCell>
      <TableCell span={4}>
        <Text>{type === "BORROW" ? "Borrow" : "Repayment"}</Text>
        <Label>{date}</Label>
      </TableCell>
      <TableCell span={1} align="right">
        <Text>${amount}</Text>
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
  const { data, toBlock, fromBlock } = useAsyncTransactions();

  const isLoading = toBlock < fromBlock;
  const isEmpty = !isLoading && data.length <= 0;
  const loadingCount = isLoading && 5 - data?.length;

  return (
    <Table>
      {isEmpty && <TransactionHistoryEmpty />}

      {data.map((tx) => (
        <TransactionHistoryRow {...tx} />
      ))}

      {loadingCount > 0 &&
        createArray(loadingCount).map(() => <TransactionHistorySkeletonRow />)}

      {isLoading && (
        <TableRow>
          <TableCell span={1}>
            <Text align="center" mt="8px">
              Loading blocks #{fromBlock} to #{toBlock}
            </Text>
          </TableCell>
        </TableRow>
      )}
    </Table>
  );
}
