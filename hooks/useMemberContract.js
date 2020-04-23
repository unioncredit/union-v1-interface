import { MEMBER_MANAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/memberManager.json";
import { getContract } from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

export default function useMemberContract() {
  const { library, chainId } = useWeb3React();

  return useAutoMemo(() => {
    try {
      return getContract(
        MEMBER_MANAGER_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );
    } catch {
      return null;
    }
  });
}
