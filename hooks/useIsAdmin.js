import { CONTROLLER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/controller.json";
import { getContract } from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";

/**
 * @returns {Boolean}
 */
export default function useIsAdmin() {
  const { library, chainId, account } = useWeb3React();

  return useAutoMemo(async () => {
    try {
      const contract = getContract(
        CONTROLLER_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );

      const isAdmin = await contract.isAdmin(account);

      return isAdmin;
    } catch {
      return false;
    }
  });
}
