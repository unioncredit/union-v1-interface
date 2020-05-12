import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { commify, formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import { BLOCKS_PER_YEAR } from "constants/variables";
import fetcher from "lib/fetcher";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useCurrentToken from "./useCurrentToken";
import useMarketRegistryContract from "./useMarketRegistryContract";
import useMemberContract from "./useMemberContract";
import useStakingContract from "./useStakingContract";
import useUnionContract from "./useUnionContract";

export function useTrustData() {
  const { library, account, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const shouldFetch =
    typeof chainId === "number" &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library
      ? true
      : false;

  return useSWR(
    shouldFetch ? ["trust", account, curToken, library, chainId] : null,
    (key, account, curToken, library, chainId) =>
      fetcher(key, { account, curToken, library, chainId })
  );
}

export function useVouchData() {
  const { library, account, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const shouldFetch =
    typeof chainId === "number" &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library
      ? true
      : false;

  return useSWR(
    shouldFetch ? ["vouch", account, curToken, library, chainId] : null,
    (key, account, curToken, library, chainId) =>
      fetcher(key, { account, curToken, library, chainId })
  );
}

export function useTransactions() {
  const { library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const shouldFetch =
    typeof chainId === "number" && isAddress(curToken) && !!library
      ? true
      : false;

  return useSWR(
    shouldFetch ? ["transactions", curToken, library, chainId] : null,
    (key, curToken, library, chainId) =>
      fetcher(key, { curToken, library, chainId })
  );
}

const getTrustCount = (contract) => async (_, account, tokenAddress) =>
  contract
    .trustList(account, tokenAddress)
    .then((res) => parseInt(res.toString()));

export function useTrustCountData() {
  const { account } = useWeb3React();
  const memberContract = useMemberContract();
  const curToken = useCurrentToken();

  const shouldFetch =
    !!memberContract && typeof account === "string" && isAddress(curToken);

  return useSWR(
    shouldFetch ? ["TrustCount", account, curToken] : null,
    getTrustCount(memberContract)
  );
}

const getStakeData = (memberContract, stakingContract) => async (
  _,
  account,
  tokenAddress
) => {
  const totalStake = await stakingContract.getStakerBalance(
    account,
    tokenAddress
  );

  const utilizedStake = await memberContract.getTotalCreditUsed(
    account,
    tokenAddress
  );

  const defaultedStake = await memberContract.getTotalFrozenAmount(
    account,
    tokenAddress
  );

  const withdrawableStake = Number(
    parseRes(totalStake) - parseRes(utilizedStake)
  ).toFixed(2);

  return {
    totalStake: parseRes(totalStake),
    utilizedStake: parseRes(utilizedStake),
    defaultedStake: parseRes(defaultedStake),
    withdrawableStake,
  };
};

export function useStakeData() {
  const { account } = useWeb3React();
  const stakingContract = useStakingContract();
  const memberContract = useMemberContract();
  const curToken = useCurrentToken();

  const shouldFetch =
    !!memberContract &&
    !!stakingContract &&
    typeof account === "string" &&
    isAddress(curToken);

  return useSWR(
    shouldFetch ? ["StakeData", account, curToken] : null,
    getStakeData(memberContract, stakingContract)
  );
}

const getBlocksPerYear = async (contract, account, tokenAddress, chainId) => {
  const delta = Number(await contract.getUserBlockDelta(account, tokenAddress));

  return delta > BLOCKS_PER_YEAR[chainId]
    ? delta
    : BLOCKS_PER_YEAR[chainId] - delta;
};

const getRewardsData = (contract) => async (
  _,
  account,
  tokenAddress,
  chainId
) => {
  const blocksPerYear = await getBlocksPerYear(
    contract,
    account,
    tokenAddress,
    chainId
  );

  const upy = await contract.calculateRewardsByBlocks(
    account,
    tokenAddress,
    blocksPerYear
  );

  const rewardsMultiplier = await contract.getRewardsMultiplier(
    account,
    tokenAddress
  );

  const rewards = await contract.calculateRewards(account, tokenAddress);

  return {
    upy: commify(parseRes(upy)),
    rewards: parseRes(rewards, 3),
    rewardsMultiplier: parseRes(rewardsMultiplier),
  };
};

export function useRewardsData() {
  const { account, chainId } = useWeb3React();
  const unionContract = useUnionContract();
  const curToken = useCurrentToken();

  const shouldFetch =
    !!unionContract &&
    typeof chainId === "number" &&
    typeof account === "string" &&
    isAddress(curToken);

  return useSWR(
    shouldFetch ? ["RewardsData", account, curToken, chainId] : null,
    getRewardsData(unionContract)
  );
}
