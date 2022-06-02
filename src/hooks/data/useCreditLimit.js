import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";

import useUserManager from "hooks/contracts/useUserManager";

async function fetchCreditLimit(_, userManager, account) {
  const limit = await userManager.getCreditLimit(account);
  return Number(formatUnits(limit, 18));
}

export default function useCreditLimit(address) {
  const { account: connectedAccount } = useWeb3React();
  const userManager = useUserManager();

  const account = address || connectedAccount;

  const shouldFetch = userManager && account && curToken;

  return useSWR(
    shouldFetch ? ["useCreditLimit", userManager, account] : null,
    fetchCreditLimit
  );
}
