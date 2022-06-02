import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "@ethersproject/units";

import parseRes from "util/parseRes";
import { roundDown } from "util/numbers";
import useUserManager from "hooks/contracts/useUserManager";

async function fetchStakeData(_, userManager, account) {
  const totalStake = await userManager.getStakerBalance(account);
  const totalLocked = await userManager.getTotalLockedStake(account);
  const totalFrozen = await userManager.getTotalFrozenAmount(account);

  return {
    totalStake: parseRes(totalStake),
    utilizedStake: parseRes(totalLocked.sub(totalFrozen)),
    withdrawableStake: roundDown(formatUnits(totalStake.sub(totalLocked), 18)),
    defaultedStake: parseRes(totalFrozen),
  };
}

export default function useStakeData() {
  const { account } = useWeb3React();
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  const shouldFetch = userManager && account;

  return useSWR(
    shouldFetch ? ["useStakeData", userManager, account] : null,
    fetchStakeData
  );
}
