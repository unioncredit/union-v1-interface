import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useUserManager from "hooks/contracts/useUserManager";
import useToken from "hooks/useToken";

function fetchCreditLimit(userManager) {
  return function (_, account) {
    return userManager.getCreditLimit(account);
  };
}

export default function useCreditLimit(address) {
  const { account: connectedAccount } = useWeb3React();
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  const account = address || connectedAccount;

  const shouldFetch = userManager && account;

  return useSWR(
    shouldFetch ? ["useCreditLimit", account] : null,
    fetchCreditLimit(userManager)
  );
}
