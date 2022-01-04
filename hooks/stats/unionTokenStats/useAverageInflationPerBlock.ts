import { BigNumber } from "@ethersproject/bignumber";
import { Contract, EventFilter } from "@ethersproject/contracts";
import useComptrollerContract from "hooks/contracts/useComptrollerContract";
import useUnionDecimals from "hooks/useUnionDecimals";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import { BLOCK_SPEED } from "constants/variables";
import useReadProvider from "hooks/useReadProvider";
import { getLogs } from "lib/logs";
import useChainId from "hooks/useChainId";

// Calculates average reward distributed per block in past week
// avg = total_reward_per_week / total_blocks_per_week
// not reasonable to assume we will ever pull this in any sort of timely manner.
const getAverageInflationPerBlock =
  (comptroller: Contract) =>
  async (_: any, decimals: BigNumber, provider: any, chainId: number) => {
    const blocknumber = await provider.getBlockNumber();
    const blockSpeed = BLOCK_SPEED[chainId];
    const weekInBlocks = (60 * 60 * 24 * 7) / blockSpeed;
    const fromBlock = blocknumber - weekInBlocks;

    const eventFilter: EventFilter = comptroller.filters.LogWithdrawRewards();
    const rewardLogs = await getLogs(provider, chainId, eventFilter, fromBlock);

    const totalReward = rewardLogs.reduce((sum: BigNumber, log: any) => {
      const event = comptroller.interface.parseLog(log);
      return sum.add(event.args.amount);
    }, BigNumber.from(0));

    const rewardPerBlock = totalReward.div(weekInBlocks);

    return formatUnits(rewardPerBlock, decimals);
  };

export default function useAverageInflationPerBlock() {
  const chainId = useChainId();
  const readProvider = useReadProvider();
  const comptroller: Contract = useComptrollerContract(readProvider);
  const { data: decimals } = useUnionDecimals();

  const shouldFetch =
    !!comptroller && !!decimals && !!readProvider && !!chainId;

  return useSWR(
    shouldFetch
      ? ["averageInflationPerBlock", decimals, readProvider, chainId]
      : null,
    getAverageInflationPerBlock(comptroller)
  );
}
