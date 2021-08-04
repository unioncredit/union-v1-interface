import { isAddress } from "@ethersproject/address";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import useSWR from "swr";
import useCurrentToken from "../useCurrentToken";
import useReadProvider from "hooks/useReadProvider";
import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "constants/variables";

const getTransactions = () => async (_, account, chainId, count) => {
  const borrowQuery = gql`
  {
    borrows(where : {account:"${account}"}) {
      id,
      account,
      amount,
      fee
    }
  }
  `;
  const borrowLogs = await request(
    GRAPHQL_URL[chainId] + "utoken",
    borrowQuery
  );
  const repayQuery = gql`
  {
    repays(where : {account:"${account}"}) {
      id,
      account,
      amount
    }
  }
  `;
  const repayLogs = await request(GRAPHQL_URL[chainId] + "utoken", repayQuery);

  const txs = await Promise.all([
    ...repayLogs.repays.map(async (log) => {
      return {
        account: log.account,
        amount: Number(formatUnits(log.amount, 18)),
        timestamp: log.timestamp,
        date: dayjs(log.timestamp * 1000).format("MMMM D, YYYY h:mm A"),
        dateShort: dayjs(log.timestamp * 1000).format("MM/DD/YY"),
        hash: log.id.split("-")[0],
        type: "REPAY",
      };
    }),
    ...borrowLogs.borrows.map(async (log) => {
      return {
        account: log.account,
        amount: Number(formatUnits(log.amount, 18)),
        timestamp: log.timestamp,
        date: dayjs(log.timestamp * 1000).format("MMMM D, YYYY h:mm A"),
        dateShort: dayjs(log.timestamp * 1000).format("MM/DD/YY"),
        fee: Number(formatUnits(log.fee, 18)),
        hash: log.id.split("-")[0],
        type: "BORROW",
      };
    }),
  ]);
  /**
   * Sort transactions by blockNumber and only return the first 5
   */
  const sortedTxs = txs
    .sort((a, b) => b.timestamp - a.timestamp)
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

  const shouldFetch = typeof account === "string" && !!chainId;

  return useSWR(
    shouldFetch ? ["Transactions", account, chainId, count] : null,
    getTransactions()
  );
}
