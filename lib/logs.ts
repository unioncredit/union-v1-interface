import { EVENT_START_BLOCK, EVENT_BLOCK_INTERVAL } from "constants/variables";

export const getLogs = async (
  provider: any,
  chainId: number,
  filter: any,
  fromBlock?: number
) => {
  const currentBlock = await provider.getBlockNumber();
  let logs = [];

  let from = fromBlock || EVENT_START_BLOCK[chainId];
  let to = from + EVENT_BLOCK_INTERVAL[chainId] - 1;

  while (from < currentBlock) {
    filter.fromBlock = from;
    filter.toBlock = to;

    const result = await provider.getLogs(filter);
    logs = logs.concat(result);

    from = to + 1;
    to = from + EVENT_BLOCK_INTERVAL[chainId] - 1;
    to = to < currentBlock ? to : currentBlock;
  }

  return logs;
};
