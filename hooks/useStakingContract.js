import ABI from "@constants/abis/stakingManager.json";
import getContract from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";
import { STAKING_MANAGER_ADDRESSES } from "@constants/";

export default function useStakingContract() {
  const { library, chainId } = useWeb3React();

  return useAutoMemo(() => {
    try {
      return getContract(
        STAKING_MANAGER_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );
    } catch {
      return null;
    }
  });
}
