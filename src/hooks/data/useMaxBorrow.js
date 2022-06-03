import useSWR from "swr";

import useUToken from "hooks/contracts/useUToken";

function fetchMaxBorrow(uToken) {
  return function () {
    return uToken.maxBorrow();
  };
}

export default function useMaxBorrow() {
  const uToken = useUToken();

  const shouldFetch = !!uToken;

  return useSWR(shouldFetch ? ["useMaxBorrow"] : null, fetchMaxBorrow(uToken));
}
