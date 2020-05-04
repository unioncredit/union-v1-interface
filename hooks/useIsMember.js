import { MEMBER_MANAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/memberManager.json";
import { getContract } from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

export default function useIsMember() {
  const { library, chainId, account } = useWeb3React();

  return useAutoMemo(() => {
    try {
      let state;

      const contract = getContract(
        MEMBER_MANAGER_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );

      contract.isMember(account).then((isMember) => (state = isMember));

      return state;
    } catch {
      return false;
    }
  });
}
