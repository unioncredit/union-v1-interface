import { isAddress } from "@ethersproject/address";
import type { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/erc20Detailed.json";
import useSWR from "swr";
import useContract from "../useContract";

const getTokenBalance = (contract: Contract) => async (
  _: any,
  __: any,
  account: string
) => {
  const decimals = await contract.decimals();

  const balanceOf = await contract.balanceOf(account);

  const balance = formatUnits(balanceOf, decimals);

  return parseFloat(balance);
};

export default function useTokenBalance(tokenAddress: string) {
  const { account } = useWeb3React();

  const contract = useContract(tokenAddress, ABI);

  const shouldFetch =
    !!contract && isAddress(tokenAddress) && typeof account === "string";

  return useSWR(
    shouldFetch ? ["TokenBalance", tokenAddress, account] : null,
    getTokenBalance(contract),
    {
      refreshInterval: 10 * 1000,
      dedupingInterval: 10 * 1000,
    }
  );
}
