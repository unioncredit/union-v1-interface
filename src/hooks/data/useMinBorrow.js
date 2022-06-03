import useSWR from "swr";

import useUToken from "hooks/contracts/useUToken";
import useToken from "hooks/useToken";

function fetchMinBorrow(uToken) {
  return function () {
    return uToken.minBorrow();
  };
}

export default function useMinBorrow() {
  const DAI = useToken("DAI");
  const uToken = useUToken(DAI);

  const shouldFetch = !!uToken;

  return useSWR(shouldFetch ? ["minBorrow"] : null, fetchMinBorrow(uToken));
}
