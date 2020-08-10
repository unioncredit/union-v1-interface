import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useMemberContract from "./contracts/useMemberContract";

const getIsMember = (contract) => async (_, account) =>
  contract.isMember(account);

export default function useIsMember() {
  const { account } = useWeb3React();

  const contract = useMemberContract();

  const shouldFetch = !!contract && typeof account === "string";

  return useSWR(
    shouldFetch ? ["IsMember", account] : null,
    getIsMember(contract),
    {
      refreshInterval: 10 * 1000,
    }
  );
}
