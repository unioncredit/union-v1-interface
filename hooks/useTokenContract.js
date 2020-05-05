import ABI from "@constants/abis/erc20Detailed.json";
import getContract from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

export default function useTokenContract(tokenAddress) {
  const { library } = useWeb3React();

  return useAutoMemo(() => {
    try {
      return getContract(tokenAddress, ABI, library.getSigner());
    } catch {
      return null;
    }
  });
}
