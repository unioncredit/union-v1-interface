import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import useToken from "hooks/useToken";
import useUToken from "hooks/contracts/useUToken";
import useUserManager from "hooks/contracts/useUserManager";
import useMulticall from "hooks/useMulticall";
import { fetchENS } from "fetchers/fetchEns";

function fetchTrustData(userManager, uToken, multicall) {
  return async function (_, staker) {
    try {
      const count = await userManager.getVoucheeCount(staker);
      const vouchees = await Promise.all(
        [...Array(parseInt(count.toString())).keys()].map(async (i) => {
          const vouchee = await userManager.vouchees(staker, i);
          return vouchee;
        })
      );
      const calls = vouchees.map((vouchee) => [
        {
          address: userManager.address,
          name: "vouchers",
          params: [vouchee.borrower, vouchee.voucherIndex.toString()],
          itf: userManager.interface,
        },
        {
          address: userManager.address,
          name: "getVouchingAmount",
          params: [staker, vouchee.borrower],
          itf: userManager.interface,
        },
        {
          address: uToken.address,
          name: "checkIsOverdue",
          params: [vouchee.borrower],
          itf: uToken.interface,
        },
        {
          address: userManager.address,
          name: "checkIsMember",
          params: [vouchee.borrower],
          itf: userManager.interface,
        },
      ]);
      const [ens, resp] = await Promise.all([
        await Promise.all(
          vouchees.map((vouchee) => fetchENS(vouchee.borrower))
        ),
        await multicall(calls),
      ]);
      return vouchees.map((vouchee, i) => {
        return {
          address: vouchee.borrower,
          isOverdue: resp[i][2].isOverdue,
          trust: resp[i][0].trust,
          used: resp[i][0].locked,
          vouched: resp[i][1][0],
          ens: ens[i].name,
          isMember: resp[i][3][0],
        };
      });
    } catch (error) {
      console.log(error);
    }
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
