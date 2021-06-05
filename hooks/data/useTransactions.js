import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import dayjs from "dayjs";
import useSWR from "swr";
import useCurrentToken from "../useCurrentToken";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useReadProvider from "hooks/useReadProvider";
import { getLogs } from "lib/logs";

const getTransactions = (marketRegistryContract) => async (
  _,
  account,
  tokenAddress,
  provider,
  chainId,
  count
) => {
  const res = await marketRegistryContract.tokens(tokenAddress);
  const uTokenAddress = res.uToken;
  const uTokenContract = new Contract(uTokenAddress, U_TOKEN_ABI, provider);

  const borrowFilter = uTokenContract.filters.LogBorrow(account);
  borrowFilter.fromBlock = 0;

  const borrowLogs = await getLogs(provider, chainId, borrowFilter);

  const repayFilter = uTokenContract.filters.LogRepay(account);
  repayFilter.fromBlock = 0;

  const repayLogs = await getLogs(provider, chainId, repayFilter);

  const txs = await Promise.all([
    ...repayLogs.map(async (log) => {
      const block = await provider.getBlock(log.blockNumber);

      const logData = uTokenContract.interface.parseLog(log);

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
      const block = await provider.getBlock(log.blockNumber);

      const logData = uTokenContract.interface.parseLog(log);

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
  const { account, chainId } = useWeb3React();
  const readProvider = useReadProvider();

  const curToken = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!readProvider &&
    !!chainId;

  return useSWR(
    shouldFetch
      ? ["Transactions", account, curToken, readProvider, chainId, count]
      : null,
    getTransactions(marketRegistryContract)
  );
}
