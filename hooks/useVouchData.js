import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useCurrentToken from "./useCurrentToken";
import useMarketRegistryContract from "./useMarketRegistryContract";
import useUserContract from "./useUserContract";

const getVouch = (marketRegistryContract, memberContract) => async (
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

  const addresses = await memberContract.getStakerAddresses(
    account,
    tokenAddress
  );

  const list = await Promise.all(
    addresses.map(async (address) => {
      const {
        vouchingAmount,
        lockedStake,
        trustAmount,
      } = await memberContract.getStakerAsset(account, address, tokenAddress);

      const totalUsed = Number(
        formatUnits(
          await memberContract.getTotalLockedStake(address, tokenAddress),
          18
        )
      );

      const stakingAmount = Number(
        formatUnits(
          await memberContract.getStakerBalance(address, tokenAddress),
          18
        )
      );

      const isOverdue = await marketContract.checkIsOverdue(address);

      const vouched = parseRes(vouchingAmount);

      const used = parseRes(lockedStake);

      const trust = parseRes(trustAmount);

      const freeStakingAmount =
        stakingAmount >= totalUsed ? stakingAmount - totalUsed : 0;

      const available =
        Number(vouched) - Number(used) > freeStakingAmount
          ? freeStakingAmount.toFixed(2)
          : Number(vouched - used).toFixed(2);

      const utilized = used / vouched;

      return {
        address,
        available,
        isOverdue,
        trust,
        used,
        utilized,
        vouched,
      };
    })
  );

  return list;
};

export default function useVouchData() {
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
    shouldFetch ? ["Vouch", account, curToken, library] : null,
    getVouch(marketRegistryContract, memberContract)
  );
}
