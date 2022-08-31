export default async function getBlockNumber(library) {
  const currentBlockNumber = await library.getBlockNumber();
  const block = await library.getBlock(currentBlockNumber);

  const args = ["eth_getTransactionReceipt", [block.transactions[0]]];
  const resp = library.send
    ? await library.send(...args)
    : await library.provider.send(...args);

  // Supports ARBITRUM which returns L1 blockNumber as `l1BlockNumber`
  const result = resp.result || resp;
  return result.l1BlockNumber || result.blockNumber;
}
