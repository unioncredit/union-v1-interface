import { MEMBER_MANAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/memberManager.json";
import getContract from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export default function useIsMember() {
  const { library, chainId, account } = useWeb3React();

  const [isMember, setIsMember] = useState();

  useEffect(() => {
    let stale = false;

    const contract = getContract(
      MEMBER_MANAGER_ADDRESSES[chainId],
      ABI,
      library.getSigner()
    );

    contract
      .isMember(account)
      .then((state) => {
        if (!stale) {
          setIsMember(state);
          return;
        }

        setIsMember(false);
      })
      .catch(() => {
        if (!stale) {
          setIsMember(false);
        }
      });

    return () => {
      stale = true;
      setIsMember();
    };
  }, [library, account]);

  return isMember;
}
