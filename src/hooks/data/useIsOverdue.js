import useSWRImmutable from "swr/immutable";
import { useWeb3React } from "@web3-react/core";
import useUToken from "hooks/contracts/useUToken";
import useToken from "hooks/useToken";

function fetchIsOverdue(uToken) {
  return function (_, account) {
    return uToken.checkIsOverdue(account);
  };
}

export default function useIsOverdue(address) {
  const { account: connectedAccount } = useWeb3React();
  const DAI = useToken("DAI");
  const uToken = useUToken(DAI);

  const account = address || connectedAccount;

  const shouldFetch = uToken && account;

  return useSWRImmutable(
    shouldFetch ? ["useIsOverdue", account] : null,
    fetchIsOverdue(uToken)
  );
}
