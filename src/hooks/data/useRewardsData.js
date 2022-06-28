import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useComptroller from "hooks/contracts/useComptroller";

function fetchRewardsData(comptroller) {
  return async function (_, account, tokenAddress) {
    const rewards = await comptroller.calculateRewards(account, tokenAddress);
    const rewardsMultiplier = await comptroller.getRewardsMultiplier(
      account,
      tokenAddress
    );

    return {
      rewards,
      rewardsMultiplier,
    };
  };
}

export default function useRewardsData() {
  const { account } = useWeb3React();
  const comptroller = useComptroller();
  const DAI = useToken("DAI");

  const shouldFetch = comptroller && account && DAI;

  return useSWR(
    shouldFetch ? ["RewardsData", account, DAI] : null,
    fetchRewardsData(comptroller),
    {
      refreshInterval: 30 * 1000,
    }
  );
}
