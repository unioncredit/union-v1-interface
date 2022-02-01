export default async function getDateFromBlock(library, block, blockspeed) {
  const currentBlockNumber = await library.getBlockNumber();

  if (block <= currentBlockNumber) {
    const blockObj = await library.getBlock(block);
    return blockObj.timestamp;
  }

  const currentBlock = await library.getBlock(currentBlockNumber);
  const secondsDay = 60 * 60 * 24; // 86400
  const blockPerDay = secondsDay / blockspeed;
  const blockDelta = block - currentBlockNumber;
  const timestampDelta = (blockDelta / blockPerDay) * secondsDay;
  return currentBlock.timestamp + timestampDelta;
}
