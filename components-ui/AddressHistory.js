import {
  Text,
  Table,
  TableCell,
  TableRow,
  Label,
  Box,
  Skeleton,
  Pagination,
} from "union-ui";
import { Dai } from "components-ui";
import useAddressHistory from "hooks/data/useAddressHistory";
import usePagination from "hooks/usePagination";
import createArray from "util/createArray";
import format from "util/formatValue";
import formatDateTime from "util/formatDateTime";

import Borrow from "union-ui/lib/icons/borrow.svg";
import Repayment from "union-ui/lib/icons/repayment.svg";
import NewMember from "union-ui/lib/icons/newMember.svg";
import NewVouch from "union-ui/lib/icons/newVouch.svg";

import { TransactionTypes } from "constants/app";
import usePublicData from "hooks/usePublicData";

const icons = {
  [TransactionTypes.BORROW]: Borrow,
  [TransactionTypes.REPAY]: Repayment,
  [TransactionTypes.TRUST]: NewVouch,
  [TransactionTypes.REGISTER]: NewMember,
};

const texts = {
  [TransactionTypes.BORROW]: () => "Borrow",
  [TransactionTypes.REPAY]: () => "Repayment",
  [TransactionTypes.TRUST]: ({ name }) => `Trusted ${name}`,
  [TransactionTypes.REGISTER]: () => "Became a member",
};

function AddressHistoryRow({ amount, type, timestamp, address }) {
  const { ENSName } = usePublicData(address);

  const name = ENSName || address?.slice(0, 6);

  const Icon = icons[type];

  const text = texts[type]({ amount, type, name });

  if (!Icon || !text) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>
        <Box align="center">
          <Icon width="24px" />
          <Text ml="8px" grey={700}>
            {text}
          </Text>
        </Box>
      </TableCell>
      <TableCell>
        <Label size="small" grey={400}>
          {formatDateTime(timestamp)}
        </Label>
      </TableCell>

      <TableCell align="right">
        {amount && (
          <Text grey={700}>
            <Dai value={format(amount, 2)} />
          </Text>
        )}
      </TableCell>
    </TableRow>
  );
}

function AddressHistorySkeletonRow() {
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

function AddressHistoryEmpty() {
  return (
    <TableRow>
      <TableCell span={3}>
        <Text>No transactions</Text>
      </TableCell>
    </TableRow>
  );
}

export function AddressHistory({ address }) {
  const { data } = useAddressHistory(address);
  const { data: pagedData, page, maxPages, setPage } = usePagination(data);

  return (
    <>
      <Table disableCondensed>
        {data?.length <= 0 && <AddressHistoryEmpty />}

        {pagedData.map((tx) => (
          <AddressHistoryRow key={tx.hash} {...tx} />
        ))}

        {!data &&
          createArray(3).map((_, i) => <AddressHistorySkeletonRow key={i} />)}
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
