import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useMemberContract from "./useMemberContract";

export default function useIsMember() {
  const { account } = useWeb3React();

  const [isMember, setIsMember] = useState();

  const memberContract = useMemberContract();

  useEffect(() => {
    let stale = false;

    memberContract
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
  }, [account]);

  return isMember;
}
