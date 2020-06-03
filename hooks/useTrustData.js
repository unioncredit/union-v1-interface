import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useCurrentToken from "./useCurrentToken";
import useMarketRegistryContract from "./useMarketRegistryContract";
import useMemberContract from "./useMemberContract";

const getTrust = (marketRegistryContract, memberContract) => async (
  _,
  account,
  tokenAddress,
  library
) => {
  const marketAddress = await marketRegistryContract.tokens(tokenAddress);

  const marketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    library.getSigner()
  );

  const addresses = await memberContract.getBorrowerAddresses(
    account,
    tokenAddress
  );

  const data = await Promise.all(
    addresses.map(async (address) => {
      const res = await memberContract.getBorrowerAsset(
        account,
        address,
        tokenAddress
      );

      const vouched = parseRes(res.vouchingAmount);

      const used = parseRes(res.lockedStake);

      const trust = parseRes(res.trustAmount);

      const percentage =
        res.vouchingAmount > 0
          ? parseFloat(res.lockedStake / res.vouchingAmount)
          : 0;

      const isOverdue = await marketContract.checkIsOverdue(address);

      const health = isOverdue ? 0 : ((vouched - used) / vouched) * 100;

      return {
        address,
        health,
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

  const memberContract = useMemberContract();

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
