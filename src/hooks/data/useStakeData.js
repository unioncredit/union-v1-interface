import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

function fetchStakeData(userManager) {
  return async function (_, account) {
    const totalStake = await userManager.getStakerBalance(account);
    const totalLocked = await userManager.getTotalLockedStake(account);
    const totalFrozen = await userManager.getTotalFrozenAmount(account);
    debugger;

    return {
      totalStake: totalStake,
      utilizedStake: totalLocked,
      withdrawableStake: totalStake.sub(totalLocked),
      defaultedStake: totalFrozen,
    };
  };
}

export default function useStakeData() {
  const { account } = useWeb3React();
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  const shouldFetch = userManager && account;

  return useSWR(
    shouldFetch ? ["useStakeData", account] : null,
    fetchStakeData(userManager)
  );
}
