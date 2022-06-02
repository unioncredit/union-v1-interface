import useSWR from "swr";

import useContract from "hooks/useContract";
import ABI from "constants/abis/uToken.json";
import useMarketRegistry from "hooks/contracts/useMarketRegistry";

async function fetchUTokenContractAddress(_, marketRegistry, underlying) {
  const resp = await marketRegistry.tokens(underlying);
  return resp.uToken;
}

export default function useUToken(underlying) {
  const marketRegistry = useMarketRegistry();
  const shouldFetch = ABI && marketRegistry;

  const { data: uTokenAddress } = useSWR(
    shouldFetch ? ["uToken", marketRegistry, underlying] : null,
    fetchUTokenContractAddress
  );

  return useContract(uTokenAddress, ABI);
}
