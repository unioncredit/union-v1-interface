import { EVENT_START_BLOCK, EVENT_BLOCK_INTERVAL } from "constants/variables";

export async function* getAsyncLogs(provider, chainId, filters, callback) {
  const currentBlock = await provider.getBlockNumber();

  const startBlock = EVENT_START_BLOCK[chainId];
  const interval = EVENT_BLOCK_INTERVAL[chainId] - 1;

  let n = currentBlock;

  while (n > startBlock) {
    const from = n - interval;

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
    yield { data: parsedResult, fromBlock: from };
    n = from;
  }
}
