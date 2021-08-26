import { isAddress } from "@ethersproject/address";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import useCurrentToken from "../useCurrentToken";
import useComptrollerContract from "../contracts/useComptrollerContract";

const getUserGovernanceTokenRewards =
  (contract) => async (_, address, tokenAddress) => {
    const calculateRewards = await contract.calculateRewards(
      address,
      tokenAddress
    );

    return parseFloat(formatUnits(calculateRewards, 18));
  };

export default function useUserGovernanceTokenRewards(address) {
  const comptrollerContract = useComptrollerContract();
  const DAI = useCurrentToken();

  const shouldFetch =
    !!comptrollerContract && typeof address === "string" && isAddress(DAI);

  return useSWR(
    shouldFetch ? ["UserGovernanceTokenRewards", address, DAI] : null,
    getUserGovernanceTokenRewards(comptrollerContract),
    {
      refreshInterval: 10 * 1000,
      dedupingInterval: 10 * 1000,
    }
  );
}
