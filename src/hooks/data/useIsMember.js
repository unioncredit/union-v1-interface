import useSWRImmutable from "swr/immutable";
import { useWeb3React } from "@web3-react/core";
import useUserManager from "hooks/contracts/useUserManager";
import useToken from "hooks/useToken";

function fetchIsMember(_, userManager, account) {
  return userManager.checkIsMember(account);
}

export default function useIsMember(address) {
  const { account: connectedAccount } = useWeb3React();
  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);

  const account = address || connectedAccount;

  const shouldFetch = userManager && account;

  return useSWRImmutable(
    shouldFetch ? ["useIsMember", userManager, account] : null,
    fetchIsMember
  );
}
