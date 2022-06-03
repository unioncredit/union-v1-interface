import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "@ethersproject/units";
import { JsonRpcProvider } from "@ethersproject/providers";

import parseRes from "util/parseRes";
import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";
import useUToken from "hooks/contracts/useUToken";

// TODO: better data fetching
function fetchVouchData(userManager, uToken) {
  return async function (_, account) {
    const ethereumRpc = new JsonRpcProvider(
      // TODO:
      `https://mainnet.infura.io/v3/05bc032e727c40d79202e3373090ed55`
    );

    const addresses = await userManager.getStakerAddresses(account);

    const list = await Promise.all(
      addresses.map(async (address) => {
        const { vouchingAmount, lockedStake, trustAmount } =
          await userManager.getStakerAsset(account, address);

        const totalUsed = Number(
          formatUnits(await userManager.getTotalLockedStake(address), 18)
        );

        const stakingAmount = Number(
          formatUnits(await userManager.getStakerBalance(address), 18)
        );

        const isMember = await userManager.checkIsMember(address);
        const isOverdue = await uToken.checkIsOverdue(address);
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

        const ens = await ethereumRpc.lookupAddress(address);

        return {
          address,
          available,
          isOverdue,
          trust,
          used,
          utilized,
          vouched,
          ens,
          isMember,
        };
      })
    );

    return list;
  };
}

export default function useVouchData(address) {
  const { account: connectedAccount } = useWeb3React();
  const account = address || connectedAccount;

  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);
  const uToken = useUToken(DAI);

  const shouldFetch = userManager && uToken && account;

  return useSWR(
    shouldFetch ? ["useVouchData", account] : null,
    fetchVouchData(userManager, uToken)
  );
}
