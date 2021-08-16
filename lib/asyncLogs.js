import { newRidgeState } from "react-ridge-state";
import { EVENT_START_BLOCK, EVENT_BLOCK_INTERVAL } from "constants/variables";

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
  const currentBlock = await provider.getBlockNumber();

  const startBlock = EVENT_START_BLOCK[chainId];
  const interval = EVENT_BLOCK_INTERVAL[chainId] - 1;
  const chunks = Math.ceil((currentBlock - startBlock) / interval);

  const key = generateStorageKey(filters);
  const { chunk = 0, data = [] } = logState.get()[key] || {};

  yield { currentBlock, key, data, chunks, chunk };

  let n = currentBlock - interval * chunk;

  while (n > startBlock) {
    const from = n - interval;
    const chunk = Math.ceil((currentBlock - from) / interval);

    const result = await Promise.all(
      filters.map((filter) =>
        provider.getLogs({
          ...filter,
          fromBlock: from,
          toBlock: n,
        })
      )
    );

    const flattened = [].concat.apply([], result);
    const parsedResult = await callback(flattened);
    yield { key, data: parsedResult, fromBlock: from, chunks, chunk };

    logState.set((state) => ({
      ...state,
      [key]: { chunk, data: [...(state[key]?.data || []), ...parsedResult] },
    }));

    n = from;
  }
}
