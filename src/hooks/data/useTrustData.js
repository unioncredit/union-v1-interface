import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUToken from "hooks/contracts/useUToken";
import useUserManager from "hooks/contracts/useUserManager";
import useMulticall from "hooks/useMulticall";
import { fetchENS } from "fetchers/fetchEns";

function fetchTrustData(userManager, uToken, multicall) {
  return async function (_, staker) {
    const voucheeCount = await userManager.getVoucherCount(staker);

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

    const addresses = Object.values(vouchersResp);

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
      // TODO: getBorrowerAsset doesn't exist in V2
      {
        address: userManager.address,
        name: "getBorrowerAsset",
        params: [staker, borrower],
        itf: userManager.interface,
      },
    ]);

    const [ens, resp] = await Promise.all([
      await Promise.all(addresses.map((address) => fetchENS(address))),
      await multicall(calls),
    ]);

    return addresses.map((address, i) => {
      return {
        address,
        isOverdue: resp[i][0][0],
        trust: resp[i][3].trustAmount,
        used: resp[i][3].lockedStake,
        vouched: resp[i][3].vouchingAmount,
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

  const shouldFetch = !!userManager && !!multicall && !!uToken;

  return useSWR(
    shouldFetch ? ["useTrustData", account] : null,
    fetchTrustData(userManager, uToken, multicall)
  );
}
