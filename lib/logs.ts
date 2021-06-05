import { EVENT_START_BLOCK, EVENT_BLOCK_INTERVAL } from "constants/variables";
import { Contract, EventFilter, Event } from "@ethersproject/contracts";

export const getLogs = async (
  provider: any,
  chainId: number,
  filter: any,
  fromBlock?: number
) => {
  const currentBlock = await provider.getBlockNumber();
  let allLogs = [];
  let from = fromBlock || EVENT_START_BLOCK[chainId];
  let to = from + EVENT_BLOCK_INTERVAL[chainId] - 1;
  while (from < currentBlock) {
    filter.fromBlock = from;
    filter.toBlock = to;
    const logs = await provider.getLogs(filter);
    allLogs = allLogs.concat(logs);
    from = to + 1;
    to = from + EVENT_BLOCK_INTERVAL[chainId] - 1;
    to = to < currentBlock ? to : currentBlock;
  }
  return allLogs;
};
