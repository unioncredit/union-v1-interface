import useContract from "hooks/useContract";
import U_TOKEN_ABI from "constants/abis/uToken.json";

async function fetchUTokenContractAddress(_, marketRegistry, underlying) {
  const resp = await marketRegistry.tokens(underlying);
  return resp.uToken;
}

export default function useUToken(underlying) {
  const marketRegistry = useMarketRegistry();
  const shouldFetch = address && ABI && isAddress(address);

  const { data: uTokenAddress } = useSWR(
    shouldFetch ? ["uToken", marketRegistry, underlying] : null,
    fetchUTokenContractAddress
  );

  return useContract(uTokenAddress, U_TOKEN_ABI);
}
