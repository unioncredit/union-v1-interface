import useSWRImmutable from "swr/immutable";
import { useWeb3React } from "@web3-react/core";

function fetchIsMember(_, userManager, account) {
  return userManager.checkIsMember(account);
}

export default function useIsMember(address) {
  const { account: connectedAccount } = useWeb3React();
  const userManager = useUserManager();

  const account = address || connectedAccount;

  const shouldFetch = userManager && account;

  return useSWRImmutable(
    shouldFetch ? ["useIsMember", userManager, account] : null,
    fetchIsMember
  );
}
