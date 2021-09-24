import { useWeb3React } from "@web3-react/core";
import { EVENT_START_BLOCK, EVENT_BLOCK_INTERVAL } from "constants/variables";
import { useEffect, useCallback, useState } from "react";
import useReadProvider from "hooks/useReadProvider";
import usePersistentState from "hooks/usePersistentState";
import { sleep } from "util/sleep";

const generateStorageKey = (chainId, filters) => {
  const flat = filters.reduce(
    (acc, item) => [...acc, item.address, ...item.topics],
    [chainId]
  );
  return flat.toString();
};

const getRanges = ({
  latestBlock,
  latestDataBlock,
  oldestDataBlock,
  startBlock,
  interval,
}) => {
  const ranges = [];
  for (let i = latestBlock; i > startBlock; i -= interval) {
    if (i >= latestDataBlock || i < oldestDataBlock) {
      const range = { to: i, from: i - interval };
      ranges.push(range);
    }
  }
  return ranges;
};

const sortTxs = (txs) =>
  txs
    .sort((a, b) => b.blockNumber - a.blockNumber)
    .reduce(
      (acc, item) =>
        acc.some((x) => x.hash === item.hash) ? acc : [...acc, item],
      []
    );

/**
 * @params {Array} filters
 * @params {Function} praser
 * @params {Object} opts
 * @params {Object} opts.startBlock
 * @params {Object} opts.startPosition START, END
 */
export default function useLogs(filters, parser, opts = {}) {
  const [loading, setLoading] = useState(false);
  const [completeLogs, setLogs] = usePersistentState(
    "union:logs:v1.1-test.4",
    {}
  );
  const { chainId } = useWeb3React();
  const readProvider = useReadProvider();

  const logKey = chainId && generateStorageKey(chainId, filters);

  const updateLogs = useCallback(
    ({ data: newLogs, oldestDataBlock }) => {
      setLogs((state) => {
        const current = state[logKey] || {};
        const currentData = current.data || [];
        const newOldestDataBlock =
          current.oldestDataBlock < oldestDataBlock
            ? current.oldestDataBlock
            : oldestDataBlock;

        return {
          ...state,
          [logKey]: {
            ...current,
            oldestDataBlock: newOldestDataBlock,
            data: sortTxs([...currentData, ...newLogs]),
          },
        };
      });
    },
    [chainId]
  );

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      const logs = completeLogs[logKey] || {};
      const logsData = logs?.data || [];

      const latestBlock = await readProvider.getBlockNumber();
      const startBlock = opts.startBlock || EVENT_START_BLOCK[chainId];
      const interval = EVENT_BLOCK_INTERVAL[chainId] - 1;
      const latestDataBlock = logsData[0]?.blockNumber || latestBlock;
      const oldestDataBlock = logs.oldestDataBlock || latestBlock;

      const unSortedRanges = getRanges({
        latestBlock,
        latestDataBlock,
        oldestDataBlock,
        startBlock,
        interval,
      });

      const ranges =
        opts.startPosition === "START"
          ? unSortedRanges.reverse()
          : unSortedRanges;

      let i = 0;
      while (i < ranges.length) {
        try {
          const { from, to } = ranges[i];
          const result = await Promise.all(
            filters.map((filter) =>
              readProvider.getLogs({
                ...filter,
                fromBlock: from,
                toBlock: to,
              })
            )
          );

          const flattened = [].concat.apply([], result);
          const parsed = await parser(flattened);
          updateLogs({ data: parsed, oldestDataBlock: to });
          i++;
        } catch (error) {
          await sleep(5);
        }
      }

      setLoading(false);
    }

    chainId && readProvider && fetchLogs().catch(console.error);
  }, [readProvider, chainId, updateLogs, logKey]);

  const data = completeLogs[logKey]?.data || [];

  return {
    data,
    isLoading: loading,
    isEmpty: !loading && data.length <= 0,
  };
}
