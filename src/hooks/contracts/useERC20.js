import useContract from "hooks/useContract";

import ABI from "constants/abis/erc20Detailed.json";

export default function useERC20(tokenAddress) {
  return useContract(tokenAddress, ABI);
}
