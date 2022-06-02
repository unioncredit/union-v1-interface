import useSWR from "swr";

import useUserManager from "hooks/contracts/useUserManager";

function fetchMaxBorrow(_, userManager) {
  return userManager.maxStakeAmount();
}

export default function useMaxStakeAmount() {
  const userManager = useUserManager();

  const shouldFetch = !!userManager;

  return useSWR(shouldFetch ? ["MaxStake", userManager] : null, fetchMaxBorrow);
}
