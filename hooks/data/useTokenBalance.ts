import { useWeb3React } from "@web3-react/core";
import useTokenBalanceOfAccount from "hooks/data/useTokenBalanceOfAccount";

export default function useTokenBalance(tokenAddress: string) {
  const { account } = useWeb3React();
  return useTokenBalanceOfAccount(tokenAddress, account);
}
