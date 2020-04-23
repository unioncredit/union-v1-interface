import ABI from "@constants/abis/erc20Detailed.json";
import { getContract } from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

const parseBalance = (balance, decimals) =>
  parseFloat(balance.toString()) / 10 ** parseFloat(decimals.toString());

export default function useTokenBalance(tokenAddress) {
  const { library, account } = useWeb3React();

  return useAutoMemo(async () => {
    try {
      const contract = getContract(tokenAddress, ABI, library.getSigner());

      const decimals = await contract.decimals();

      const balance = await contract.balanceOf(account);

      return parseBalance(balance, decimals);
    } catch {
      return null;
    }
  });
}
