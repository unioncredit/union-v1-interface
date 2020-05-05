import ABI from "@constants/abis/erc20Detailed.json";
import { formatUnits } from "@ethersproject/units";
import getContract from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

export default function useTokenBalance(tokenAddress) {
  const { library, account } = useWeb3React();

  return useAutoMemo(async () => {
    try {
      const contract = getContract(tokenAddress, ABI, library.getSigner());

      const decimals = await contract.decimals();

      const balance = await contract.balanceOf(account);

      return formatUnits(balance, decimals);
    } catch {
      return "0";
    }
  });
}
