import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";

import useToken from "hooks/useToken";
import useUToken from "hooks/contracts/useUToken";
import useUserManager from "hooks/contracts/useUserManager";
import useMulticall from "hooks/useMulticall";

function fetchTrustData(userManager, uToken, multicall) {
  return async function (_, address) {
    const addresses = await userManager.getBorrowerAddresses(address);

    const calls = addresses.map((borrower) => [
      {
        address: userManager.address,
        name: "getBorrowerAsset",
        params: [address, borrower],
        itf: userManager.interface,
      },
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
    ]);

    const resp = await multicall(calls);

    return addresses.map((address, i) => {
      return {
        address,
        isOverdue: resp[i][1].isOverdue,
        trust: resp[i][0].trustAmount,
        used: resp[i][0].lockedStake,
        vouched: resp[i][0].vouchingAmount,
        ens: null,
        isMember: resp[i][2][0],
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
