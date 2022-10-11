import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { BLACKLIST_ADDRESSES } from "constants/variables";

export default function useIsBlacklisted() {
  const { active, account } = useWeb3React();

  const [isBlacklisted, setIsBlacklisted] = useState(false);

  useEffect(() => {
    if (
      active &&
      account &&
      BLACKLIST_ADDRESSES.includes(account.toLowerCase())
    ) {
      setIsBlacklisted(true);
    } else {
      setIsBlacklisted(false);
    }
  }, [active, account]);

  return isBlacklisted;
}
