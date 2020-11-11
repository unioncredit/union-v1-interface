import { useWeb3React } from "@web3-react/core";
import { USER_MANAGER_ADDRESSES } from "constants/variables";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useUnionContract from "../contracts/useUnionContract";

const getUnionAllowance = (contract) => async (_, account, chainId) => {
  const res = await contract.allowance(
    account,
    USER_MANAGER_ADDRESSES[chainId]
  );

  return parseRes(res);
};

export default function useUnionAllowance() {
  const { account, chainId } = useWeb3React();

  const contract = useUnionContract();

  const shouldFetch =
    !!contract && typeof account === "string" && typeof chainId === "number";

  return useSWR(
    shouldFetch ? ["UnionAllowance", account, chainId] : null,
    getUnionAllowance(contract),
    {
      dedupingInterval: 10 * 1000,
      refreshInterval: 10 * 1000,
    }
  );
}
