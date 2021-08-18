import { isAddress } from "@ethersproject/address";
import type { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import type { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import useSWR from "swr";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useCurrentToken from "../useCurrentToken";
import USER_MANAGER_ABI from "constants/abis/userManager.json";

const getTrust =
  (marketRegistryContract: Contract) =>
  async (
    _: any,
    account: string,
    tokenAddress: string,
    library: Web3Provider,
    count: number
  ) => {
    const res = await marketRegistryContract.tokens(tokenAddress);
    const signer = library.getSigner();
    const uTokenAddress = res.uToken;
    const userManagerAddress = res.userManager;

    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      signer
    );

    const uTokenContract = new Contract(uTokenAddress, U_TOKEN_ABI, signer);

    const addresses: string[] = await userManagerContract.getBorrowerAddresses(
      account
    );

    const size = count ?? addresses.length;

    const data = await Promise.all(
      addresses.slice(0, size).map(async (address) => {
        const res: {
          vouchingAmount: BigNumber;
          lockedStake: BigNumber;
          trustAmount: BigNumber;
        } = await userManagerContract.getBorrowerAsset(account, address);

        const vouched = Number(formatUnits(res.vouchingAmount, 18));

        const used = Number(formatUnits(res.lockedStake, 18));

        const trust = Number(formatUnits(res.trustAmount, 18));

        const percentage = vouched > 0 ? used / vouched : 0;

        const isOverdue: boolean = await uTokenContract.checkIsOverdue(address);

        const health = isOverdue ? 0 : ((vouched - used) / vouched) * 100;

        return {
          address,
          health,
          isOverdue,
          percentage,
          trust,
          used,
          utilized: percentage,
          vouched,
        };
      })
    );

    return data;
  };

export default function useTrustData() {
  const { library, account } = useWeb3React();

  const curToken = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["Trust", account, curToken, library] : null,
    getTrust(marketRegistryContract)
  );
}
