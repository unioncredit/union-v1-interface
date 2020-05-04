import { CONTROLLER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/controller.json";
import { getContract } from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export default function useIsAdmin() {
  const { library, chainId, account } = useWeb3React();

  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    let stale = false;

    const contract = getContract(
      CONTROLLER_ADDRESSES[chainId],
      ABI,
      library.getSigner()
    );

    contract
      .isAdmin(account)
      .then((state) => {
        if (!stale) {
          setIsAdmin(state);

          return;
        }

        setIsAdmin(false);
      })
      .catch(() => {
        if (!stale) {
          setIsAdmin(false);
        }
      });

    return () => {
      stale = true;
      setIsAdmin();
    };
  }, [library, account]);

  return isAdmin;
}
