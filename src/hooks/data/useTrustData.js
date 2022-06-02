import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";

import useToken from "hooks/useToken";
import useUToken from "hooks/contracts/useUToken";
import useUserManager from "hooks/contracts/useUserManager";

// TODO: convert this to use multicall
async function fetchTrustData(_, userManager, uToken, account) {
  const ethereumRpc = new JsonRpcProvider(
    // TODO:
    `https://mainnet.infura.io/v3/05bc032e727c40d79202e3373090ed55`
  );

  const addresses = await userManager.getBorrowerAddresses(account);

  const data = await Promise.all(
    addresses.map(async (address) => {
      const res = await userManager.getBorrowerAsset(account, address);

      const vouched = Number(formatUnits(res.vouchingAmount, 18));
      const used = Number(formatUnits(res.lockedStake, 18));
      const trust = Number(formatUnits(res.trustAmount, 18));
      const percentage = vouched > 0 ? used / vouched : 0;
      const isOverdue = await uToken.checkIsOverdue(address);
      const health = isOverdue ? 0 : ((vouched - used) / vouched) * 100;
      const ens = await ethereumRpc.lookupAddress(address);
      const isMember = await userManager.checkIsMember(address);

      return {
        address,
        health,
        isOverdue,
        percentage,
        trust,
        used,
        utilized: percentage,
        vouched,
        ens,
        isMember,
      };
    })
  );

  return data;
}

export default function useTrustData(address) {
  const { account: connectedAccount } = useWeb3React();
  const account = address || connectedAccount;

  const DAI = useToken("DAI");
  const userManager = useUserManager(DAI);
  const uToken = useUToken(DAI);

  const shouldFetch = userManager && account;

  return useSWR(
    shouldFetch ? ["useTrustData", userManager, uToken, account] : null,
    fetchTrustData
  );
}
