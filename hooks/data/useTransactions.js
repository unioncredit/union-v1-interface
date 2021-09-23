import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useReadProvider from "hooks/useReadProvider";
import useUTokenContract from "hooks/contracts/useUTokenContract";
import useLogs from "hooks/data/useLogs";

const parseTransactionsLog = (provider, uTokenContract) => async (logs) => {
  const borrowFilter = uTokenContract.filters.LogBorrow();

  const txs = await Promise.all(
    logs.map(async (log) => {
      const block = await provider.getBlock(log.blockNumber);

      const logData = uTokenContract.interface.parseLog(log);

      const [account, amount, fee] = logData.args;

      const type =
        borrowFilter.topics[0] === log.topics[0] ? "BORROW" : "REPAY";

      const data = {
        account,
        amount: Number(formatUnits(amount, 18)),
        blockNumber: log.blockNumber,
        ts: block.timestamp * 1000,
        hash: log.transactionHash,
        type,
      };

      if (fee) data.fee = Number(formatUnits(fee, 18));

      return data;
    })
  );

  return txs;
};

/**
 * @name useTransactions
 *
 * @param {Number} count The number of txs to return in the array
 */
export default function useTransactions() {
  const { account } = useWeb3React();
  const uTokenContract = useUTokenContract();
  const readProvider = useReadProvider();

  const borrowFilter = uTokenContract.filters.LogBorrow(account);
  const repayFilter = uTokenContract.filters.LogRepay(account);
  const parser = parseTransactionsLog(readProvider, uTokenContract);

  return useLogs([borrowFilter, repayFilter], parser);
}
