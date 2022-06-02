import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";

import useUToken from "hooks/contracts/useUToken";

async function fetchMaxBorrow(uToken) {
  const res = await uToken.maxBorrow();
  return Number(formatUnits(res, 18));
}

export default function useMaxBorrow() {
  const uToken = useUToken();

  const shouldFetch = !!uToken;

  return useSWR(shouldFetch ? ["useMaxBorrow", uToken] : null, fetchMaxBorrow);
}
