import useSWR from "swr";

import useChainId from "hooks/useChainId";
import useUnionToken from "hooks/contracts/useUnionToken";

async function fetchSymbol(_, unionToken) {
  return unionToken.symbol();
}

export default function useUnionSymbol() {
  const chainId = useChainId();
  const unionToken = useUnionToken();

  const shouldFetch = !!unionToken;

  return useSWR(
    shouldFetch ? ["unionSymbol", unionToken, chainId] : null,
    fetchSymbol
  );
}
