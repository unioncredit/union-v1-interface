import { MEMBER_MANAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/memberManager.json";
import { getContract } from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

/**
 * @returns {Boolean}
 */
export default function useIsMember() {
  const { library, chainId, account } = useWeb3React();

  return useAutoMemo(async () => {
    try {
      const contract = getContract(
        MEMBER_MANAGER_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );

      const isMember = await contract.isMember(account);

      console.log({ isMember });

      return isMember;
    } catch {
      return false;
    }
  });
}
