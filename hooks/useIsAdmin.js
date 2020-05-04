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

  return useAutoMemo(() => {
    try {
      let state = false;

      const contract = getContract(
        CONTROLLER_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );

      contract.isAdmin(account).then((isAdmin) => (state = isAdmin));

      return state;
    } catch {
      return false;
    }
  });
}
