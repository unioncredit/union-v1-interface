import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";
import useUToken from "hooks/contracts/useUToken";
import useMulticall from "hooks/useMulticall";
import { fetchENS } from "fetchers/fetchEns";

function fetchVouchData(userManager, uToken, multicall) {
  return async function (_, borrower) {
    try {
      const count = await userManager.getVoucherCount(borrower);
      const vouchers = await Promise.all(
        [...Array(count).keys()].map(async (i) => {
          const voucher = await userManager.vouchers(borrower, i);
          const voucherIndex = await userManager.voucherIndexes(
            borrower,
            voucher.staker
          );
          return Object.assign({}, voucher, { voucherIndex });
        })
      );

      const calls = vouchers.map((voucher) => [
        {
          address: userManager.address,
          name: "vouchers",
          params: [borrower, voucher.voucherIndex[1].toString()],
          itf: userManager.interface,
        },
        {
          address: userManager.address,
          name: "getVouchingAmount",
          params: [voucher.staker, borrower],
          itf: userManager.interface,
        },
        {
          address: userManager.address,
          name: "getStakerBalance",
          params: [voucher.staker],
          itf: userManager.interface,
        },
        {
          address: uToken.address,
          name: "checkIsOverdue",
          params: [voucher.staker],
          itf: uToken.interface,
        },
        {
          address: userManager.address,
          name: "checkIsMember",
          params: [voucher.staker],
          itf: userManager.interface,
        },
        {
          address: userManager.address,
          name: "getTotalLockedStake",
          params: [voucher.staker],
          itf: userManager.interface,
        },
      ]);

      const [ens, resp] = await Promise.all([
        await Promise.all(vouchers.map((voucher) => fetchENS(voucher.staker))),
        await multicall(calls),
      ]);

      return vouchers.map((voucher, i) => {
        const vouched = resp[i][1][0];
        const used = resp[i][0].locked;
        const totalUsed = resp[i][5][0];
        const staked = resp[i][2][0];
        const availableVouch = vouched.sub(used);
        const availableStake = staked.sub(totalUsed);
        const available = availableVouch.gt(availableStake)
          ? availableStake
          : availableVouch;

        return {
          address: voucher.staker,
          isOverdue: resp[i][3][0],
          staked,
          available,
          trust: resp[i][0].trust,
          used,
          vouched,
          ens: ens[i].name,
          isMember: resp[i][4][0],
        };
      });
    } catch (error) {
      console.log(error);
      return [];
    }
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
