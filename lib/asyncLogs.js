import { newRidgeState } from "react-ridge-state";
import { EVENT_START_BLOCK, EVENT_BLOCK_INTERVAL } from "constants/variables";
import { addToast, FLAVORS } from "hooks/useToast";

const initialState =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("union:logs"))
    : {};

const logState = newRidgeState(initialState);

const generateStorageKey = (filters) => {
  const flat = filters.reduce(
    (acc, item) => [...acc, item.address, ...item.topics],
    []
  );
  return flat.toString();
};

export async function* getAsyncLogs(provider, chainId, filters, callback) {
  const latestBlock = await provider.getBlockNumber();

  const key = generateStorageKey(filters);
  const {
    data = [],
    oldestDataBlock = latestBlock,
    chunk = 0,
  } = logState.get()?.[key] || {};

  const latestDataBlock = data[0]?.blockNumber || latestBlock;

  const startBlock = EVENT_START_BLOCK[chainId];
  const interval = EVENT_BLOCK_INTERVAL[chainId] - 1;

  const ranges = [];
  for (let i = latestBlock; i > startBlock; i -= interval) {
    if (i >= latestDataBlock || i < oldestDataBlock) {
      const range = { to: i, from: i - interval };
      ranges.push(range);
    }
  }

  yield {
    oldestDataBlock,
    key,
    data,
    chunks: ranges.length,
    chunk,
  };

  for (let i = 0; i < ranges.length; i++) {
    try {
      const { from, to } = ranges[i];
      const chunk = i + 1;

      const result = await Promise.all(
        filters.map((filter) =>
          provider.getLogs({
            ...filter,
            fromBlock: from,
            toBlock: to,
          })
        )
      );
      const flattened = [].concat.apply([], result);
      const parsedResult = await callback(flattened);

      const meta = {
        key,
        chunk,
        fromBlock: from,
        oldestDataBlock: to < oldestDataBlock ? to : oldestDataBlock,
      };

      yield {
        data: parsedResult,
        ...meta,
      };

      logState.set((state) => {
        const currentValue = state?.[key] || {};
        const currentData = currentValue.data || [];
        return {
          ...state,
          [key]: {
            ...currentValue,
            ...meta,
            data: [...currentData, ...parsedResult],
          },
        };
      });
    } catch (err) {
      addToast(
        FLAVORS.ERROR("Failed to fetch logs. Refresh page to try again.")
      );
      break;
    }
  }
}
