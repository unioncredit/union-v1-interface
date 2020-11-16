import type { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useUserContract from "../contracts/useUserContract";

const getIsMember = (contract: Contract) => async (_: any, account: string) => {
  const isMember: boolean = await contract.checkIsMember(account);

  return isMember;
};

export default function useIsMember() {
  const { account } = useWeb3React();

  const contract = useUserContract();

  const shouldFetch = !!contract && typeof account === "string";

  return useSWR(
    shouldFetch ? ["IsMember", account] : null,
    getIsMember(contract),
    {
      refreshInterval: 10 * 1000,
    }
  );
}
