import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";

import getBlockNumber from "util/getBlockNumber";
import { formatDueDate } from "util/formatDueDate";
import useToken from "hooks/useToken";
import useUToken from "hooks/contracts/useUToken";
import { BLOCKS_PER_YEAR, BLOCK_SPEED } from "constants/variables";

const getPaymentDue = async (isOverdue, lastRepay, overdueBlocks, library) => {
  if (isOverdue) return "Overdue";
  if (lastRepay.lte(0)) return "No Payment Due";

  const chainId = library.network.chainId;
  const blockNumber = await getBlockNumber(library);
  const seconds =
    (lastRepay + overdueBlocks - blockNumber) * BLOCK_SPEED[chainId];

  return formatDueDate(seconds);
};

const fetchBorrowData = (uToken) => async (_, account, chainId, library) => {
  const borrowRatePerBlock = await uToken.borrowRatePerBlock();
  const borrowed = await uToken.getBorrowed(account);
  const fee = await uToken.originationFee();
  const interest = await uToken.calculatingInterest(account);
  const overdueBlocks = await uToken.overdueBlocks();
  const isOverdue = await uToken.checkIsOverdue(account);
  const lastRepay = await uToken.getLastRepay(account);
  const paymentPeriod = formatDueDate(
    overdueBlocks.mul(BLOCK_SPEED[chainId]).toNumber()
  );

  const paymentDueDate = await getPaymentDue(
    isOverdue,
    lastRepay,
    overdueBlocks,
    library
  );

  return {
    borrowRatePerBlock,
    borrowed,
    fee,
    interest,
    overdueBlocks,
    isOverdue,
    lastRepay,
    paymentPeriod,
    paymentDueDate,
    apr: Number(formatUnits(borrowRatePerBlock, 18)) * BLOCKS_PER_YEAR[chainId],
  };
};

export default function useBorrowData(address) {
  const { account: connectedAccount, chainId, library } = useWeb3React();
  const DAI = useToken("DAI");
  const uToken = useUToken(DAI);

  const account = address || connectedAccount;

  const shouldFetch = account && uToken;

  return useSWR(
    shouldFetch ? ["useBorrowData", account, chainId, library] : null,
    fetchBorrowData(uToken)
  );
}
