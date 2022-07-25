import useSWR from "swr";
import { Contract } from "@ethersproject/contracts";
import { AddressZero, USER_MANAGER_ADDRESSES } from "constants/variables";

import ABI from "constants/abis/userManager.json";
import { options } from "util/switchChain";
import { JsonRpcProvider } from "@ethersproject/providers";
import { RPC_URLS } from "lib/connectors";
import { useWeb3React } from "@web3-react/core";

const userManager = new Contract(AddressZero, ABI);

async function fetchMemberStatuses(_, connector) {
  const rows = await Promise.all(
    options.map(async (option) => {
      const account = await connector.getAccount();

      const jsonProvider = new JsonRpcProvider(RPC_URLS[option.chainId]);
      const um = userManager
        .attach(USER_MANAGER_ADDRESSES[option.chainId])
        .connect(jsonProvider);

      const isMember = await um.checkIsMember(account);
      const creditLimit = await um.getCreditLimit(account);

      return [option.chainId, isMember, creditLimit];
    })
  );

  return rows.reduce((acc, row) => {
    return { ...acc, [row[0]]: { isMember: row[1], creditLimit: row[2] } };
  }, {});
}

export default function useOmniMemberStatus() {
  const { connector } = useWeb3React();

  return useSWR(
    connector ? ["OmniMemberStatus", connector] : null,
    fetchMemberStatuses
  );
}
