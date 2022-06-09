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
  TableHead,
} from "@unioncredit/ui";

import { ReactComponent as Borrow } from "@unioncredit/ui/lib/icons/borrow.svg";
import { ReactComponent as Repayment } from "@unioncredit/ui/lib/icons/repayment.svg";
import { ReactComponent as NewMember } from "@unioncredit/ui/lib/icons/newMember.svg";
import { ReactComponent as NewVouch } from "@unioncredit/ui/lib/icons/newVouch.svg";
import { ReactComponent as NewVouchRecieved } from "@unioncredit/ui/lib/icons/newVouchRecieved.svg";
import { ReactComponent as CancelledVouch } from "@unioncredit/ui/lib/icons/cancelVouch.svg";
import { ReactComponent as InlineExternal } from "@unioncredit/ui/lib/icons/externalinline.svg";

import { TransactionTypes } from "constants/app";
import usePublicData from "hooks/usePublicData";
import usePagination from "hooks/usePagination";
import createArray from "util/createArray";
import format from "util/formatValue";
import formatDateTime from "util/formatDateTime";
import truncateName from "util/truncateName";
import getEtherscanLink from "util/getEtherscanLink";
import useChainId from "hooks/useChainId";
import { Avatar } from "components-ui/Avatar";

import "./TransactionHistory.scss";
import { Link } from "./Link";

const icons = {
  [TransactionTypes.CANCEL]: CancelledVouch,
  [TransactionTypes.BORROW]: Borrow,
  [TransactionTypes.REPAY]: Repayment,
  [TransactionTypes.TRUST]: NewVouch,
  [TransactionTypes.TRUSTED]: NewVouchRecieved,
  [TransactionTypes.REGISTER]: NewMember,
};

const texts = {
  [TransactionTypes.CANCEL]: "Cancelled Vouch",
  [TransactionTypes.BORROW]: "Borrow",
  [TransactionTypes.REPAY]: "Repayment",
  [TransactionTypes.TRUST]: "Sent vouch",
  [TransactionTypes.TRUSTED]: "Received vouch",
  [TransactionTypes.REGISTER]: "Became a member",
};

function TransactionHistoryRow({
  amount,
  type,
  timestamp,
  borrower,
  staker,
  id,
}) {
  const chainId = useChainId();

  const { ENSName: borrowerENS } = usePublicData(borrower);
  const { ENSName: stakerENS } = usePublicData(staker);

  const Icon = icons[type];

  const text = texts[type];

  if (!Icon || !text) {
    return null;
  }

  const address =
    type === TransactionTypes.TRUSTED
      ? [stakerENS, staker]
      : type === TransactionTypes.TRUST
      ? [borrowerENS, borrower]
      : null;

  const txHash = id && id.split("-")[0];

  return (
    <TableRow>
      <TableCell fixedSize>
        {address && address[1] ? (
          <div className="avatarIcon">
            <Avatar address={address[1]} size={24} />
            <Icon width="16px" />
          </div>
        ) : (
          <Icon width="24px" />
        )}
      </TableCell>
      <TableCell>
        <Box direction="vertical">
          <Label as="p" grey={700} m={0}>
            {text}{" "}
            {address && (
              <Label as="span" grey={400} m={0}>
                <Link to={`/profile/${address[1]}`}>
                  {truncateName(address[0]) || address[1].slice(0, 6)}
                </Link>
              </Label>
            )}
          </Label>
          <Label as="p" size="small" grey={400} m={0}>
            <a
              href={getEtherscanLink(chainId, txHash, "TRANSACTION")}
              target="_blank"
            >
              {formatDateTime(timestamp)} <InlineExternal width="12px" />
            </a>
          </Label>
        </Box>
      </TableCell>
      <TableCell align="right">
        {amount && <Text grey={700}>{format(amount, 2)}</Text>}
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
      <Table className="transactionHistory">
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Event</TableHead>
          <TableHead align="right">Value (DAI)</TableHead>
        </TableRow>
        {data?.length <= 0 && <TransactionHistoryEmpty />}

        {pagedData.map((tx, i) => (
          <TransactionHistoryRow key={i} {...tx} />
        ))}

        {!data &&
          createArray(3).map((_, i) => (
            <TransactionHistorySkeletonRow key={i} />
          ))}
      </Table>

      <Pagination pages={maxPages} activePage={page} onClick={setPage} />
    </>
  );
}
