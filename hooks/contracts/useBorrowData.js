import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import { BLOCKS_PER_YEAR, BLOCK_SPEED } from "constants/variables";
import useSWR from "swr";
import { formatDueDate } from "util/formatDueDate";
import useCurrentToken from "../useCurrentToken";
import useMarketRegistryContract from "./useMarketRegistryContract";
import { roundUp } from "util/numbers";

const getPaymentDue = async (account, chainId, contract, library) => {
  let due;

  const isOverdue = await contract.checkIsOverdue(account);

  if (isOverdue) {
    due = "Overdue";
    return due;
  }

  const lastRepayRes = await contract.getLastRepay(account);
  const lastRepay = parseInt(lastRepayRes.toString());

  const overdueBlocksRes = await contract.overdueBlocks();
  const overdueBlocks = parseInt(overdueBlocksRes.toString());

  const curBlock = await library.getBlockNumber();

  if (lastRepay === 0) {
    due = "No Payment Due";
    return due;
  }

  const seconds = (lastRepay + overdueBlocks - curBlock) * BLOCK_SPEED[chainId];

  return formatDueDate(seconds);
};

const getCreditLimit = (contract) => async (
  _,
  account,
  tokenAddress,
  chainId,
  library
) => {
  const marketAddress = await contract.tokens(tokenAddress);

  const marketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    library.getSigner()
  );

  const apr = await marketContract.borrowRatePerBlock();

  const borrowed = await marketContract.getBorrowed(account);

  const fee = await marketContract.originationFee();

  const interest = await marketContract.calculatingInterest(account);

  const overdueBlocks = await marketContract.overdueBlocks();

  const isOverdue = await marketContract.checkIsOverdue(account);

  const paymentDueDate = await getPaymentDue(
    account,
    chainId,
    marketContract,
    library
  );

  const paymentPeriod = formatDueDate(
    overdueBlocks.mul(BLOCK_SPEED[chainId]).toNumber()
  );

  return {
    apr: Number(formatUnits(apr, 18)) * BLOCKS_PER_YEAR[chainId],
    borrowedRounded: roundUp(
      Number(formatUnits(borrowed, 18)) + Number(formatUnits(interest, 18))
    ),
    borrowedRaw:
      Number(formatUnits(borrowed, 18)) + Number(formatUnits(interest, 18)),
    fee: Number(formatUnits(fee, 18)),
    interest: Number(formatUnits(interest, 18)),
    paymentDueDate,
    paymentPeriod,
    isOverdue,
  };
};

export default function useBorrowData() {
  const { account, library, chainId } = useWeb3React();
  const curToken = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    typeof chainId === "number" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["CreditLimit", account, curToken, chainId, library] : null,
    getCreditLimit(marketRegistryContract)
  );
}