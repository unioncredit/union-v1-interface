import useContract from "hooks/useContract";
import ABI from "constants/abis/userManager.json";

async function fetchUserManagerContractAddress(_, marketRegistry, underlying) {
  const resp = await marketRegistry.tokens(underlying);
  return resp.userManager;
}

export default function useUserManager(underlying) {
  const marketRegistry = useMarketRegistry();
  const shouldFetch = address && ABI && isAddress(address);

  const { data: userManagerAddress } = useSWR(
    shouldFetch ? ["userManager", marketRegistry, underlying] : null,
    fetchUserManagerContractAddress
  );

  return useContract(userManagerAddress, USER_MANAGER_ABI);
}
