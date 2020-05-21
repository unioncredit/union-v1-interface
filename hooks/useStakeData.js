import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useCurrentToken from "./useCurrentToken";
import useMemberContract from "./useMemberContract";
import useStakingContract from "./useStakingContract";

const getStakeData = (memberContract, stakingContract) => async (
  _,
  account,
  tokenAddress
) => {
  const totalStake = await stakingContract.getStakerBalance(
    account,
    tokenAddress
  );

  const utilizedStake = await memberContract.getTotalLockedStake(
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

export default function useStakeData() {
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
