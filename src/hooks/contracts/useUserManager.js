import useSWR from "swr";

import useContract from "hooks/useContract";
import useMarketRegistry from "hooks/contracts/useMarketRegistry";

import ABI from "constants/abis/userManager.json";

function fetchUserManagerContractAddress(marketRegistry) {
  return async function (_, underlying) {
    const resp = await marketRegistry.tokens(underlying);
    return resp.userManager;
  };
}

export default function useUserManager(underlying) {
  const marketRegistry = useMarketRegistry();
  const shouldFetch = !!marketRegistry;

  const { data: userManagerAddress } = useSWR(
    shouldFetch ? ["userManager", underlying] : null,
    fetchUserManagerContractAddress(marketRegistry)
  );

  return useContract(userManagerAddress, ABI);
}
