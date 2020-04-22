import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import { useAutoEffect } from "hooks.macro";
import { useState } from "react";

/**
 * @name useENSName
 * @description Gets the ENS name for the active account
 *
 * @returns {String}
 */
export default function useENSName(address) {
  const { library } = useWeb3React();

  const [ENSName, setENSName] = useState();

  useAutoEffect(() => {
    if (!!(isAddress(address) && library)) {
      let stale = false;
      library
        .lookupAddress(address)
        .then((name) => {
          if (!stale) {
            if (name) {
              setENSName(name);
            } else {
              setENSName(null);
            }
          }
        })
        .catch(() => {
          if (!stale) {
            setENSName(null);
          }
        });

      return () => {
        stale = true;
        setENSName();
      };
    }
  });

  return ENSName;
}
