import { isAddress } from "@ethersproject/address";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { roundDown } from "util/numbers";
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

  const totalLocked = await memberContract.getTotalLockedStake(
    account,
    tokenAddress
  );

  const totalFrozen = await memberContract.getTotalFrozenAmount(
    account,
    tokenAddress
  );

  return {
    totalStake: parseRes(totalStake),
    utilizedStake: parseRes(totalFrozen.sub(totalLocked)),
    withdrawableStake: roundDown(formatUnits(totalStake.sub(totalLocked), 18)),
    defaultedStake: parseRes(totalFrozen),
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
