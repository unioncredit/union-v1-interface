import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import { BLOCKS_PER_YEAR } from "constants/variables";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useCurrentToken from "../useCurrentToken";
import useUserContract from "../contracts/useUserContract";

const getBlocksPerYear = async (contract, account, tokenAddress, chainId) => {
  try {
    const res = await contract.getUserBlockDelta(account, tokenAddress);

    const delta = Number(res);

    return delta > BLOCKS_PER_YEAR[chainId]
      ? delta
      : BLOCKS_PER_YEAR[chainId] - delta;
  } catch (error) {
    console.error("getBlocksPerYear", error);
    throw error;
  }
};

const getRewardsData = (contract) => async (
  _,
  account,
  tokenAddress,
  chainId
) => {
  try {
    const blocksPerYear = await getBlocksPerYear(
      contract,
      account,
      tokenAddress,
      chainId
    );

    const upy = await contract.calculateRewardsByBlocks(
      account,
      tokenAddress,
      blocksPerYear
    );

    const rewardsMultiplier = await contract.getRewardsMultiplier(
      account,
      tokenAddress
    );

    const rewards = await contract.calculateRewards(account, tokenAddress);

    return {
      upy: parseRes(upy),
      rewards: parseRes(rewards, 3),
      rewardsMultiplier: parseRes(rewardsMultiplier),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function useRewardsData() {
  const { account, chainId } = useWeb3React();
  const userContract = useUserContract();
  const curToken = useCurrentToken();

  const shouldFetch =
    !!userContract &&
    typeof chainId === "number" &&
    typeof account === "string" &&
    isAddress(curToken);

  return useSWR(
    shouldFetch ? ["RewardsData", account, curToken, chainId] : null,
    getRewardsData(userContract),
    {
      refreshInterval: 10 * 1000,
      dedupingInterval: 10 * 1000,
    }
  );
}
