import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUToken from "hooks/contracts/useUToken";
import useUserManager from "hooks/contracts/useUserManager";
import useMulticall from "hooks/useMulticall";
import { fetchENS } from "fetchers/fetchEns";
import useUnionLens from "hooks/contracts/useUnionLens";

function fetchTrustData(userManager, uToken, multicall, unionLens, underlying) {
  return async function (_, staker) {
    const voucheeCount = await userManager.getVoucheeCount(staker);

    if (voucheeCount.lte(0)) return [];

    const voucheeCalls = Array(Number(voucheeCount.toString()))
      .fill(null)
      .map((_, i) => ({
        address: userManager.address,
        name: "vouchees",
        params: [staker, i],
        itf: userManager.interface,
      }));

    const vouchersResp = await multicall(voucheeCalls);

    const addresses = Object.values(vouchersResp).map((vouchee) =>
      vouchee[0].slice(0, 42)
    );

    const calls = addresses.map((borrower) => [
      {
        address: uToken.address,
        name: "checkIsOverdue",
        params: [borrower],
        itf: uToken.interface,
      },
      {
        address: userManager.address,
        name: "checkIsMember",
        params: [borrower],
        itf: userManager.interface,
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
      const related = resp[i][2].related;

      return {
        address,
        isOverdue: resp[i][0][0],
        trust: related.voucher.trust,
        used: related.voucher.locked,
        vouched: related.voucher.vouch,
        ens: ens[i].name,
        isMember: resp[i][1][0],
      };
    });
  };
}

export default function useTrustData(address) {
  const { account: connectedAccount } = useWeb3React();
  const account = address || connectedAccount;

  const DAI = useToken("DAI");
  const uToken = useUToken(DAI);
  const userManager = useUserManager(DAI);
  const multicall = useMulticall();
  const unionLens = useUnionLens();

  const shouldFetch = !!userManager && !!multicall && !!uToken && !!unionLens;

  return useSWR(
    shouldFetch ? ["useTrustData", account] : null,
    fetchTrustData(userManager, uToken, multicall, unionLens, DAI)
  );
}
