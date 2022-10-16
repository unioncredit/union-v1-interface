import useSWR from "swr";
import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

function fetchEffectiveNumber(userManager) {
  return async function () {
    return userManager.effectiveCount();
  };
}

export default function useEffectiveNumber() {
  const DAI = useToken();
  const userManager = useUserManager(DAI);

  const shouldFetch = !!userManager;

  return useSWR(
    shouldFetch ? ["useEffectiveNumber"] : null,
    fetchEffectiveNumber(userManager)
  );
}
