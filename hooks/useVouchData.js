import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useCurrentToken from "./useCurrentToken";
import useMarketRegistryContract from "./contracts/useMarketRegistryContract";
import useMemberContract from "./contracts/useMemberContract";
import useStakingContract from "./contracts/useStakingContract";

const getVouch = (
  marketRegistryContract,
  memberContract,
  stakingContract
) => async (_, account, tokenAddress, library) => {
  const marketAddress = await marketRegistryContract.tokens(tokenAddress);

  const marketContract = new Contract(
    marketAddress,
    LENDING_MARKET_ABI,
    library.getSigner()
  );

  const creditLimitRes = await marketContract.getCreditLimit(account);

  const creditLimit = parseRes(creditLimitRes);

  const addresses = await memberContract.getStakerAddresses(
    account,
    tokenAddress
  );

  const list = await Promise.all(
    addresses.map(async (address) => {
      const res = await memberContract.getStakerAsset(
        account,
        address,
        tokenAddress
      );

      const totalUsed = Number(
        formatUnits(
          await memberContract.getTotalLockedStake(address, tokenAddress),
          18
        )
      );

      const stakingAmount = Number(
        formatUnits(
          await stakingContract.getStakerBalance(address, tokenAddress),
          18
        )
      );

      const isOverdue = await marketContract.checkIsOverdue(address);

      const vouched = parseRes(res.vouchingAmount);

      const used = parseRes(res.lockedStake);

      const freeStakingAmount =
        stakingAmount >= totalUsed ? stakingAmount - totalUsed : 0;

      const available =
        Number(vouched) - Number(used) > freeStakingAmount
          ? freeStakingAmount.toFixed(2)
          : Number(vouched - used).toFixed(2);

      const trust = parseRes(res.trustAmount);

      const health = (Number(available) / vouched) * 100;

      const calcPct = Number(parseFloat(available) / parseFloat(creditLimit));
      const percentage =
        calcPct > 1 ? 1 : typeof calcPct !== "number" ? 0 : calcPct;

      return {
        address,
        available,
        health,
        isOverdue,
        percentage,
        trust,
        used,
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

  const memberContract = useMemberContract();

  const stakingContract = useStakingContract();

  const shouldFetch =
    !!marketRegistryContract &&
    !!memberContract &&
    !!stakingContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["Vouch", account, curToken, library] : null,
    getVouch(marketRegistryContract, memberContract, stakingContract)
  );
}
