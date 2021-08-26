import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useCurrentToken from "../useCurrentToken";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

const getTrustCount =
  (marketRegistryContract: Contract) =>
  async (_: any, account: string, library: any, tokenAddress: string) => {
    let count = 0;

    const signer = library.getSigner();
    const res = await marketRegistryContract.tokens(tokenAddress);
    const userManagerAddress = res.userManager;
    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      signer
    );

    const addresses: string[] = await userManagerContract.getStakerAddresses(
      account
    );

    await Promise.all(
      addresses.map(async (stakerAddress) => {
        const trustAmount: number = await userManagerContract.getVouchingAmount(
          stakerAddress,
          account
        );

        const isMember: boolean = await userManagerContract.checkIsMember(
          stakerAddress
        );

        if (trustAmount > 0 && isMember) count++;
      })
    );

    return count;
  };

export default function useTrustCountData() {
  const { account, library } = useWeb3React();
  const marketRegistryContract = useMarketRegistryContract();
  const curToken = useCurrentToken();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken);

  return useSWR(
    shouldFetch ? ["TrustCount", account, library, curToken] : null,
    getTrustCount(marketRegistryContract)
  );
}
