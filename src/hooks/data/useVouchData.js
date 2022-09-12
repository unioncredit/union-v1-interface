import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";
import useUToken from "hooks/contracts/useUToken";
import useMulticall from "hooks/useMulticall";
import { fetchENS } from "fetchers/fetchEns";

function fetchVouchData(userManager, uToken, multicall) {
  return async function (_, borrower) {
    const voucherCount = await userManager.getVoucherCount(borrower);

    if (voucherCount.lte(0)) return [];

    const voucherCalls = Array(Number(voucherCount.toString()))
      .fill(null)
      .map((_, i) => ({
        address: userManager.address,
        name: "vouchers",
        params: [borrower, i],
        itf: userManager.interface,
      }));

    const vouchersResp = await multicall(voucherCalls);

    const addresses = Object.values(vouchersResp);

    const calls = addresses.map((staker) => [
      {
        address: userManager.address,
        name: "getVouchingAmount",
        params: [borrower, staker],
        itf: userManager.interface,
      },
      {
        address: userManager.address,
        name: "getLockedStake",
        params: [borrower, staker],
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
      const vouched = resp[i][0][0];
      const used = resp[i][1][0];
      const totalUsed = resp[i][5][0];
      const staked = resp[i][2][0];
      const availableVouch = vouched.sub(used);
      const availableStake = staked.sub(totalUsed);
      const available = availableVouch.gt(availableStake)
        ? availableStake
        : availableVouch;

      return {
        address,
        isOverdue: resp[i][3][0],
        staked,
        available,
        trust: resp[i][0].trustAmount,
        used,
        vouched,
        ens: ens[i].name,
        isMember: resp[i][4][0],
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
