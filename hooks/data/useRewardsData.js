import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useUserContract from "../contracts/useUserContract";
import useCurrentToken from "../useCurrentToken";

const getRewardsData = (contract) => async (_, account, tokenAddress) => {
  try {
    const rewardsMultiplier = await contract.getRewardsMultiplier(
      account,
      tokenAddress
    );

    const rewards = await contract.calculateRewards(account, tokenAddress);

    return {
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
