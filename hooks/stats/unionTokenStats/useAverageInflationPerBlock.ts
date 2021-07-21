import { BigNumber } from "@ethersproject/bignumber";
import { Contract, EventFilter, Event } from "@ethersproject/contracts";
import useComptrollerContract from "hooks/contracts/useComptrollerContract";
import useUnionDecimals from "hooks/useUnionDecimals";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { BLOCK_SPEED } from "constants/variables";
import useReadProvider from "hooks/useReadProvider";
import { getLogs } from "lib/logs";

// Calculates average reward distributed per block in past week
// avg = total_reward_per_week / total_blocks_per_week
const getAverageInflationPerBlock = (comptroller: Contract) => async (
  _: any,
  decimals: BigNumber,
  provider: any,
  chainId: number
) => {
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
  const comptroller: Contract = useComptrollerContract();
  const { data: decimals } = useUnionDecimals();
  const { chainId } = useWeb3React();
  const readProvider = useReadProvider();

  const shouldFetch =
    !!comptroller && !!decimals && !!readProvider && !!chainId;

  return useSWR(
    shouldFetch
      ? ["averageInflationPerBlock", decimals, readProvider, chainId]
      : null,
    getAverageInflationPerBlock(comptroller)
  );
}
