import useSWR from "swr";

import useUserManager from "hooks/contracts/useUserManager";
import useToken from "hooks/useToken";

function fetchMaxBorrow(_, userManager) {
  return userManager.maxStakeAmount();
}

export default function useMaxStakeAmount() {
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  const shouldFetch = !!userManager;

  return useSWR(shouldFetch ? ["MaxStake", userManager] : null, fetchMaxBorrow);
}
