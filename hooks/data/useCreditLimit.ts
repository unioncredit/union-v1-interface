import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useCurrentToken from "../useCurrentToken";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

const getCreditLimit =
  (marketRegistryContract: Contract) =>
  async (_: any, library: any, account: string, tokenAddress: string) => {
    const signer = library.getSigner();
    const res = await marketRegistryContract.tokens(tokenAddress);
    const userManagerAddress = res.userManager;
    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      signer
    );

    const limit = await userManagerContract.getCreditLimit(account);

    return limit;
  };

export default function useCreditLimit(address: string) {
  const { account: connectedAccount, library } = useWeb3React();
  const curToken = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  const account = address || connectedAccount;

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["CreditLimit", library, account, curToken] : null,
    getCreditLimit(marketRegistryContract)
  );
}
