import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

async function fetchTrustCount(_, userManager, account) {
  const addresses = await userManager.vouchers(account);

  const vouchers = await Promise.all(
    addresses.map(async (staker) => {
      const trustAmount = await userManager.getVouchingAmount(staker, account);
      const isMember = await userManager.checkIsMember(staker);

      return trustAmount > 0 && isMember;
    })
  );

  return vouchers.length;
}

export default function useTrustCountData() {
  const { account } = useWeb3React();
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  const shouldFetch = userManager && account;

  return useSWR(
    shouldFetch ? ["useTrustCount", userManager, account] : null,
    fetchTrustCount
  );
}
