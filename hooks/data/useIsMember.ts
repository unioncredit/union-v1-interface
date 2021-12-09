import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import type { Web3Provider } from "@ethersproject/providers";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useCurrentToken from "../useCurrentToken";

const getIsMember =
  (marketRegistryContract: Contract) =>
  async (
    _: any,
    account: string,
    tokenAddress: string,
    library: Web3Provider
  ) => {
    const signer = library.getSigner();
    const res = await marketRegistryContract.tokens(tokenAddress);
    const userManagerAddress = res.userManager;
    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      signer
    );

    const isMember: boolean = await userManagerContract.checkIsMember(account);
    return isMember;
  };

export default function useIsMember(address: string) {
  const { account: connectedAccount, library } = useWeb3React();
  const curToken = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  const account = address || connectedAccount;

  const shouldFetch = !!marketRegistryContract && typeof account === "string";

  return useSWR(
    shouldFetch ? ["IsMember", account, curToken, library] : null,
    getIsMember(marketRegistryContract)
  );
}
