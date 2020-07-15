import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useControllerContract from "./contracts/useControllerContract";

const getIsAdmin = (contract) => async (_, account) =>
  contract.isAdmin(account);

export default function useIsAdmin() {
  const { account } = useWeb3React();

  const contract = useControllerContract();

  const shouldFetch = !!contract && typeof account === "string";

  return useSWR(
    shouldFetch ? ["IsAdmin", account] : null,
    getIsAdmin(contract),
    {
      dedupingInterval: 15 * 1000,
      refreshInterval: 30 * 1000,
    }
  );
}
