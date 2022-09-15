import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";
import useUToken from "hooks/contracts/useUToken";
import useMulticall from "hooks/useMulticall";
import { fetchENS } from "fetchers/fetchEns";
import useUnionLens from "hooks/contracts/useUnionLens";

function fetchVouchData(userManager, multicall, unionLens, underlying) {
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

    const addresses = Object.values(vouchersResp).map(
      (voucher) => voucher.staker
    );

    const calls = addresses.map((staker) => [
      {
        address: unionLens.address,
        name: "getUserInfo",
        params: [underlying, staker],
        itf: unionLens.interface,
      },
      {
        address: unionLens.address,
        name: "getRelatedInfo",
        params: [underlying, staker, borrower],
        itf: unionLens.interface,
      },
    ]);

    const [ens, resp] = await Promise.all([
      await Promise.all(addresses.map((address) => fetchENS(address))),
      await multicall(calls),
    ]);

    return addresses.map((address, i) => {
      const userInfo = resp[i][0].userInfo;
      const related = resp[i][1].related;

      // TODO should be vouch not trust
      const vouched = related.voucher.vouch;
      const trust = related.voucher.trust;
      const used = related.voucher.locked;
      const totalUsed = userInfo.locked;
      const staked = userInfo.stakedAmount;

      const availableVouch = vouched.sub(used);
      const availableStake = staked.sub(totalUsed);
      const available = availableVouch.gt(availableStake)
        ? availableStake
        : availableVouch;

      return {
        address,
        isOverdue: userInfo.isOverdue,
        staked,
        available,
        trust,
        used,
        vouched,
        ens: ens[i].name,
        isMember: userInfo.isMember,
      };
    });
  };
}

export default function useVouchData(address) {
  const { account: connectedAccount } = useWeb3React();
  const account = address || connectedAccount;

  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);
  const multicall = useMulticall();
  const unionLens = useUnionLens();

  const shouldFetch = !!userManager && !!multicall && !!unionLens;

  return useSWR(
    shouldFetch ? ["useVouchData", account] : null,
    fetchVouchData(userManager, multicall, unionLens, DAI)
  );
}
