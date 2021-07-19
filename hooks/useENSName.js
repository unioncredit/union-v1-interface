import { isAddress } from "@ethersproject/address";
import { useEffect, useState } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";

/**
 * @name useENSName
 * @description Gets the ENS name for the active account
 *
 * @returns {String}
 */
export default function useENSName(address) {
  //Fixed getting ens data from the main network
  const library = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  );

  const [ENSName, setENSName] = useState(null);

  useEffect(() => {
    const validated = isAddress(address);
    if (!validated) {
      setENSName(null);
      return;
    } else {
      let stale = false;
      library
        .lookupAddress(address.toLowerCase())
        .then((name) => {
          if (!stale) {
            if (name) {
              setENSName(name);
            } else {
              setENSName(null);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          if (!stale) {
            setENSName(null);
          }
        });

      return () => {
        stale = true;
      };
    }
  }, [library, address]);

  return ENSName;
}
