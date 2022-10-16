import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";
import useUToken from "hooks/contracts/useUToken";
import useMulticall from "hooks/useMulticall";
import { fetchENS } from "fetchers/fetchEns";

function fetchVouchData(userManager, uToken, multicall) {
  return async function (_, address) {
    const addresses = await userManager.vouchers(address);

    const calls = addresses.map((staker) => [
      {
        address: userManager.address,
        name: "getStakerAsset",
        params: [address, staker],
        itf: userManager.interface,
      },
      {
        address: userManager.address,
        name: "getStakerBalance",
        params: [staker],
        itf: userManager.interface,
      },
      {
        address: uToken.address,
        name: "checkIsOverdue",
        params: [staker],
        itf: uToken.interface,
      },
      {
        address: userManager.address,
        name: "checkIsMember",
        params: [staker],
        itf: userManager.interface,
      },
      {
        address: userManager.address,
        name: "getTotalLockedStake",
        params: [staker],
        itf: userManager.interface,
      },
    ]);

    const [ens, resp] = await Promise.all([
      await Promise.all(addresses.map((address) => fetchENS(address))),
      await multicall(calls),
    ]);

    return addresses.map((address, i) => {
      const vouched = resp[i][0].vouchingAmount;
      const used = resp[i][0].lockedStake;
      const totalUsed = resp[i][4][0];
      const staked = resp[i][1][0];
      const availableVouch = vouched.sub(used);
      const availableStake = staked.sub(totalUsed);
      const available = availableVouch.gt(availableStake)
        ? availableStake
        : availableVouch;

      return {
        address,
        isOverdue: resp[i][2][0],
        staked,
        available,
        trust: resp[i][0].trustAmount,
        used,
        vouched,
        ens: ens[i].name,
        isMember: resp[i][3][0],
      };
    });
  };
}

export default function useVouchData(address) {
  const { account: connectedAccount } = useWeb3React();
  const account = address || connectedAccount;

  const DAI = useToken("DAI");
  const uToken = useUToken(DAI);
  const userManager = useUserManager(DAI);
  const multicall = useMulticall();

  const shouldFetch = !!userManager && !!multicall && !!uToken;

  return useSWR(
    shouldFetch ? ["useVouchData", account] : null,
    fetchVouchData(userManager, uToken, multicall)
  );
}
