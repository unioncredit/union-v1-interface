import useSWR from "swr";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

function fetchMemberFee(userManager) {
  return userManager.newMemberFee();
}

export default function useMemberFee() {
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  const shouldFetch = !!userManager;

  return useSWR(
    shouldFetch ? ["MemberFee", userManager] : null,
    fetchMemberFee,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
