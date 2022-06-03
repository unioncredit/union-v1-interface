import { isAddress } from "@ethersproject/address";
import ABI from "constants/abis/erc20Detailed.json";
import useSWR from "swr";
import useContract from "../useContract";
import { AddressZero } from "constants/variables";
import useReadProvider from "hooks/useReadProvider";

const getTokenBalanceOfAccount = (contract) => (_, __, account) => {
  return contract.balanceOf(account);
};

export default function useTokenBalanceOfAccount(tokenAddress, account) {
  const readProvider = useReadProvider();
  const contract = useContract(tokenAddress, ABI, readProvider);

  const shouldFetch =
    !!contract &&
    isAddress(tokenAddress) &&
    isAddress(account) &&
    account !== AddressZero;

  return useSWR(
    shouldFetch ? ["TokenBalance", tokenAddress, account] : null,
    getTokenBalanceOfAccount(contract)
  );
}
