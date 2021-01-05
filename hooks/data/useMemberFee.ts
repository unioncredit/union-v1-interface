import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import type { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useCurrentToken from "../useCurrentToken";

const getMemberFee = (marketRegistryContract: Contract) => async (
  library: Web3Provider,
  tokenAddress: string
) => {
  const signer = library.getSigner();
  const res = await marketRegistryContract.tokens(tokenAddress);
  const userManagerAddress = res.userManager;
  const userManagerContract = new Contract(
    userManagerAddress,
    USER_MANAGER_ABI,
    signer
  );

  const fee = await userManagerContract.newMemberFee();

  return Number(formatUnits(fee, 18));
};

export default function useMemberFee() {
  const { library } = useWeb3React();
  const curToken = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch = !!marketRegistryContract;

  return useSWR(
    shouldFetch ? ["MemberFee", library, curToken] : null,
    getMemberFee(marketRegistryContract),
    {
      refreshInterval: 10 * 1000,
    }
  );
}
