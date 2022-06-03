import useSWR from "swr";

import useUToken from "hooks/contracts/useUToken";
import useToken from "hooks/useToken";

function fetchMaxBorrow(uToken) {
  return function () {
    return uToken.maxBorrow();
  };
}

export default function useMaxBorrow() {
  const DAI = useToken("DAI");
  const uToken = useUToken(DAI);

  const shouldFetch = !!uToken;

  return useSWR(shouldFetch ? ["useMaxBorrow"] : null, fetchMaxBorrow(uToken));
}
