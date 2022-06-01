import {
  Text,
  Table,
  TableCell,
  TableRow,
  Label,
  Box,
  Skeleton,
  Pagination,
  EmptyState,
} from "@unioncredit/ui";
import { useWeb3React } from "@web3-react/core";
import { Dai } from "components-ui";
import usePagination from "hooks/usePagination";
import createArray from "util/createArray";
import format from "util/formatValue";
import formatDateTime from "util/formatDateTime";
import truncateName from "util/truncateName";

import { ReactComponent as Borrow } from "@unioncredit/ui/lib/icons/borrow.svg";
import { ReactComponent as Repayment } from "@unioncredit/ui/lib/icons/repayment.svg";
import { ReactComponent as NewMember } from "@unioncredit/ui/lib/icons/newMember.svg";
import { ReactComponent as NewVouch } from "@unioncredit/ui/lib/icons/newVouch.svg";
import { ReactComponent as NewVouchRecieved } from "@unioncredit/ui/lib/icons/newVouchRecieved.svg";
import { ReactComponent as CancelledVouch } from "@unioncredit/ui/lib/icons/cancelVouch.svg";

import { TransactionTypes } from "constants/app";
import usePublicData from "hooks/usePublicData";

const icons = {
  [TransactionTypes.CANCEL]: CancelledVouch,
  [TransactionTypes.BORROW]: Borrow,
  [TransactionTypes.REPAY]: Repayment,
  [TransactionTypes.TRUST]: NewVouch,
  [TransactionTypes.TRUSTED]: NewVouchRecieved,
  [TransactionTypes.REGISTER]: NewMember,
};

const texts = {
  [TransactionTypes.CANCEL]: ({ borrowerName }) => `Cancelled ${borrowerName}`,
  [TransactionTypes.BORROW]: () => "Borrow",
  [TransactionTypes.REPAY]: () => "Repayment",
  [TransactionTypes.TRUST]: ({ borrowerName }) => `Trusted ${borrowerName}`,
  [TransactionTypes.TRUSTED]: ({ stakerName }) => `Trusted by ${stakerName}`,
  [TransactionTypes.REGISTER]: () => "Became a member",
};

const parseName = (account, address, ENSName) => {
  return account?.toLowerCase() === address?.toLowerCase()
    ? "You"
    : ENSName || address?.slice(0, 6);
};
function TransactionHistoryRow({ amount, type, timestamp, borrower, staker }) {
  const { account } = useWeb3React();

  const { ENSName: borrowerENS } = usePublicData(borrower);
  const { ENSName: stakerENS } = usePublicData(staker);

  const borrowerName = parseName(account, borrower, borrowerENS);
  const stakerName = parseName(account, staker, stakerENS);

  const Icon = icons[type];

  const text = texts[type]?.({
    amount,
    type,
    borrowerName: truncateName(borrowerName),
    stakerName: truncateName(stakerName),
  });

  if (!Icon || !text) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>
        <Box align="center">
          <Icon width="24px" />
          <Box direction="vertical">
            <Label as="p" ml="8px" grey={700} mb={0}>
              {text}
            </Label>
            <Label
              as="p"
              ml="8px"
              size="small"
              className="hide-gt-600"
              grey={400}
            >
              {formatDateTime(timestamp)}
            </Label>
          </Box>
        </Box>
      </TableCell>
      <TableCell className="hide-lt-600">
        <Label as="p" size="small" grey={400}>
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
  return <EmptyState label="No transactions" />;
}

export function TransactionHistory({ data }) {
  const { data: pagedData, page, maxPages, setPage } = usePagination(data);

  return (
    <>
      <Table disableCondensed>
        {data?.length <= 0 && <TransactionHistoryEmpty />}

        {pagedData.map((tx, i) => (
          <TransactionHistoryRow key={i} {...tx} />
        ))}

        {!data &&
          createArray(3).map((_, i) => (
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
