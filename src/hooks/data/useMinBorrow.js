import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";

import useUToken from "hooks/contracts/useUToken";

function fetchMinBorrow(uToken) {
  return async function () {
    const minBorrow = await uToken.minBorrow();
    return Number(formatUnits(minBorrow, 18));
  };
}

export default function useMinBorrow() {
  const uToken = useUToken();

  const shouldFetch = !!uToken;

  return useSWR(shouldFetch ? ["minBorrow"] : null, fetchMinBorrow(uToken));
}
