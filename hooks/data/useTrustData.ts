import { isAddress } from "@ethersproject/address";
import type { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import useSWR from "swr";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useCurrentToken from "../useCurrentToken";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useReadProvider from "hooks/useReadProvider";

const getTrust =
  (marketRegistryContract: Contract, provider: any) =>
  async (_: any, account: string, tokenAddress: string, count: number) => {
    const ethereumRpc = new JsonRpcProvider(
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
    );
    const res = await marketRegistryContract.tokens(tokenAddress);
    const uTokenAddress = res.uToken;
    const userManagerAddress = res.userManager;

    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      provider
    );

    const uTokenContract = new Contract(uTokenAddress, U_TOKEN_ABI, provider);

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

        const ens = await ethereumRpc.lookupAddress(address);

        const isMember = await userManagerContract.checkIsMember(address);

        return {
          address,
          health,
          isOverdue,
          percentage,
          trust,
          used,
          utilized: percentage,
          vouched,
          ens,
          isMember,
        };
      })
    );

    return data;
  };

export default function useTrustData(address: string) {
  const readProvider = useReadProvider();
  const { account: connectedAccount } = useWeb3React();
  const account = address || connectedAccount;

  const curToken = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract(readProvider);

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!readProvider;

  return useSWR(
    shouldFetch ? ["Trust", account, curToken] : null,
    getTrust(marketRegistryContract, readProvider)
  );
}
