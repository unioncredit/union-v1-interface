import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";

async function fetchTrustCount(_, userManager, account) {
  try {
    const count = await userManager.getVoucherCount(account);

    const vouchers = await Promise.all(
      [...Array(count).keys()].map(async (index) => {
        const voucher = await userManager.vouchers(account, index);
        const trustAmount = await userManager.getVouchingAmount(
          voucher.staker,
          account
        );
        return trustAmount > 0;
      })
    );

    return vouchers.length;
  } catch (error) {
    console.log(error);
  }
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
