import useSWR from "swr";
import { isAddress } from "@ethersproject/address";
import { JsonRpcProvider } from "@ethersproject/providers";

const getENSName = (_, address) => {
  const library = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  );
  return library.lookupAddress(address);
};

/**
 * @name useENSName
 * @description Gets the ENS name for the active account
 *
 * @returns {String}
 */
export default function useENSName(address) {
  const shouldFetch = isAddress(address);
  const { data } = useSWR(
    shouldFetch ? ["ENSName", address] : null,
    getENSName
  );
  return data;
}
