import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";
import useMulticall from "hooks/useMulticall";

function fetchStakeData(userManager, multicall) {
  return async function (_, account) {
    const totalStake = await userManager.getStakerBalance(account);
    const totalLocked = await userManager.getTotalLockedStake(account);
    const totalFrozen = await userManager.getTotalFrozenAmount(account);
    const memberFrozen = await userManager.memberFrozen(account);

    const borrowers = await userManager.getBorrowerAddresses(account);
    let totalMemberFrozen = BigNumber.from(0);
    const calls = borrowers.map((borrower) => {
      return {
        address: userManager.address,
        name: "memberFrozen",
        params: [borrower],
        itf: userManager.interface,
      };
    });
    const resp = await multicall(calls);
    for (let i = 0; i < resp.length; i++) {
      totalMemberFrozen = totalMemberFrozen.add(resp[i][0]);
    }

    return {
      memberFrozen,
      totalStake: totalStake,
      totalFrozen: totalFrozen,
      utilizedStake: totalLocked,
      withdrawableStake: totalStake.sub(totalLocked),
      defaultedStake: totalMemberFrozen,
    };
  };
}

export default function useStakeData() {
  const { account } = useWeb3React();
  const DAI = useToken("DAI");
  const multicall = useMulticall();
  const userManager = useUserManager(DAI);

  const shouldFetch = userManager && account;

  return useSWR(
    shouldFetch ? ["useStakeData", account] : null,
    fetchStakeData(userManager, multicall)
  );
}
