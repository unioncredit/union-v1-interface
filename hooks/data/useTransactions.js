import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import dayjs from "dayjs";
import useSWR from "swr";
import useCurrentToken from "../useCurrentToken";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

const getTransactions = (marketRegistryContract) => async (
  _,
  account,
  tokenAddress,
  library,
  count
) => {
  const signer = library.getSigner();

  const marketAddress = await marketRegistryContract.tokens(tokenAddress);

  const marketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    signer
  );

  const borrowFilter = marketContract.filters.LogBorrow(account);
  borrowFilter.fromBlock = 0;

  const borrowLogs = await signer.provider.getLogs(borrowFilter);

  const repayFilter = marketContract.filters.LogRepay(account);
  repayFilter.fromBlock = 0;

  const repayLogs = await signer.provider.getLogs(repayFilter);

  const txs = await Promise.all([
    ...repayLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      const logData = marketContract.interface.parseLog(log);

      const [account, amount] = logData.args;

      return {
        account,
        amount: Number(formatUnits(amount, 18)),
        blockNumber: log.blockNumber,
        date: dayjs(block.timestamp * 1000).format("MMMM D, YYYY h:mm A"),
        dateShort: dayjs(block.timestamp * 1000).format("MM/DD/YY"),
        hash: log.transactionHash,
        type: "REPAY",
      };
    }),
    ...borrowLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      const logData = marketContract.interface.parseLog(log);

      const [account, amount, fee] = logData.args;

      return {
        account,
        amount: Number(formatUnits(amount, 18)),
        blockNumber: log.blockNumber,
        date: dayjs(block.timestamp * 1000).format("MMMM D, YYYY h:mm A"),
        dateShort: dayjs(block.timestamp * 1000).format("MM/DD/YY"),
        fee: Number(formatUnits(fee, 18)),
        hash: log.transactionHash,
        type: "BORROW",
      };
    }),
  ]);

  /**
   * Sort transactions by blockNumber and only return the first 5
   */
  const sortedTxs = txs
    .sort((a, b) => b.blockNumber - a.blockNumber)
    .slice(0, count);

  return sortedTxs;
};

/**
 * @name useTransactions
 *
 * @param {Number} count The number of txs to return in the array
 */
export default function useTransactions(count = 5) {
  const { account, library } = useWeb3React();

  const curToken = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["Transactions", account, curToken, library, count] : null,
    getTransactions(marketRegistryContract)
  );
}
