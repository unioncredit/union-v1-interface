import { isAddress } from "@ethersproject/address";
import type { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import type { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useSWR from "swr";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useUserContract from "../contracts/useUserContract";
import useCurrentToken from "../useCurrentToken";

const getTrust = (
  marketRegistryContract: Contract,
  memberContract: Contract
) => async (
  _: any,
  account: string,
  tokenAddress: string,
  library: Web3Provider
) => {
  const marketAddress: string = await marketRegistryContract.tokens(
    tokenAddress
  );

  const marketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    library.getSigner()
  );

  const addresses: string[] = await memberContract.getBorrowerAddresses(
    account,
    tokenAddress
  );

  const data = await Promise.all(
    addresses.map(async (address) => {
      const res: {
        vouchingAmount: BigNumber;
        lockedStake: BigNumber;
        trustAmount: BigNumber;
      } = await memberContract.getBorrowerAsset(account, address, tokenAddress);

      const vouched = Number(formatUnits(res.vouchingAmount, 18));

      const used = Number(formatUnits(res.lockedStake, 18));

      const trust = Number(formatUnits(res.trustAmount, 18));

      const percentage = vouched < 0 ? used / vouched : 0;

      const isOverdue: boolean = await marketContract.checkIsOverdue(address);

      const health = isOverdue ? 0 : ((vouched - used) / vouched) * 100;

      return {
        address,
        health,
        isOverdue,
        percentage,
        trust,
        used,
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

  const memberContract = useUserContract();

  const shouldFetch =
    !!marketRegistryContract &&
    !!memberContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["Trust", account, curToken, library] : null,
    getTrust(marketRegistryContract, memberContract)
  );
}
